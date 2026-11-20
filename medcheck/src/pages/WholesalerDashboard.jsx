import * as React from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Building2,
  Store,
  PackageCheck,
  Truck,
  ScanBarcode,
  Search,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Plus,
  ArrowLeftRight,
  FileText,
  Boxes,
  Download,
  Printer,
  X,
  Package,
  Loader2,
  Pill,
} from "lucide-react"
import { NavigationBar } from "@/layouts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import VerificationTypeSelect from "@/components/common/VerificationTypeSelect"
import { verifyMedicine } from "@/services/verificationService"
import {
  getWholesalers,
  getRetailers,
  formatStakeholderLabel,
  getStakeholderId,
} from "@/services/stakeholderService"
import {
  getAvailableDrugs,
  DEFAULT_DRUGS_DATA,
} from "@/services/drugService"
import { transferBatch } from "@/services/distributionService"
import { useAuth } from "@/features/authentication"

const INITIAL_SHIPMENTS = [
  {
    id: "SHP-2026-901",
    product: "Amoxicillin Trihydrate 500mg (1,000 Boxes)",
    lot: "LOT-2026-AMX-910",
    manufacturer: "Swiss Pharma Nigeria",
    destination: "Lagos Central Depot -> Mainland Pharmacies",
    status: "VERIFIED_IN_TRANSIT",
    time: "2026-10-18 19:42",
  },
  {
    id: "SHP-2026-884",
    product: "Artemether/Lumefantrine 20/120mg (500 Cartons)",
    lot: "LOT-NL-2026-881",
    manufacturer: "Novartis Pharma",
    destination: "Ikeja Distribution Hub",
    status: "RECEIVED_AUTHENTIC",
    time: "2026-10-18 14:15",
  },
]

export default function WholesalerDashboard() {
  const navigate = useNavigate()
  const { auth, token } = useAuth()
  const activeToken = token || auth?.token || ""
  const [shipments, setShipments] = React.useState(INITIAL_SHIPMENTS)
  const [scanCode, setScanCode] = React.useState("")
  const [verificationType, setVerificationType] = React.useState("batch")
  const [scanResult, setScanResult] = React.useState(null)
  const [isScanning, setIsScanning] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Modal dialog states for new actions
  const [isTransferOpen, setIsTransferOpen] = React.useState(false)
  const [isReportsOpen, setIsReportsOpen] = React.useState(false)
  const [isAvailableBatchesOpen, setIsAvailableBatchesOpen] = React.useState(false)

  // Transfer form state
  const [transferType, setTransferType] = React.useState("batch")
  const [transferCode, setTransferCode] = React.useState("")
  const [transferDestination, setTransferDestination] = React.useState("")
  const [transferQuantity, setTransferQuantity] = React.useState("")
  const [transferSuccess, setTransferSuccess] = React.useState("")
  const [transferError, setTransferError] = React.useState("")
  const [isTransferring, setIsTransferring] = React.useState(false)
  const [batchSearchQuery, setBatchSearchQuery] = React.useState("")
  const [transferConfirmationPopup, setTransferConfirmationPopup] = React.useState(null)

  // Recipient stakeholder directory states (/api/v1/wholesaler & /api/v1/retailer)
  const [recipientType, setRecipientType] = React.useState("retailer") // "retailer" | "wholesaler"
  const [recipientsList, setRecipientsList] = React.useState([])
  const [isLoadingRecipients, setIsLoadingRecipients] = React.useState(false)
  const [selectedRecipientId, setSelectedRecipientId] = React.useState("")

  // Drug & Batch catalog states (using the required JSON format)
  const [drugsList, setDrugsList] = React.useState(DEFAULT_DRUGS_DATA.drugs)
  const [selectedDrugId, setSelectedDrugId] = React.useState("1ab9b691-2246-4ef9-aea5-b50a04255fa8")
  const [selectedBatchId, setSelectedBatchId] = React.useState("ab9da4f4-1c97-4c1a-ad1d-e18f8362c3dd")
  const [isLoadingDrugs, setIsLoadingDrugs] = React.useState(false)

  // Memoized current drug and its batches
  const selectedDrug = React.useMemo(() => {
    return drugsList.find((d) => d.drugId === selectedDrugId) || drugsList[0] || null
  }, [drugsList, selectedDrugId])

  const availableBatchesForDrug = React.useMemo(() => {
    return selectedDrug?.batches || []
  }, [selectedDrug])

  const selectedBatch = React.useMemo(() => {
    return (
      availableBatchesForDrug.find((b) => b.id === selectedBatchId) ||
      availableBatchesForDrug[0] ||
      null
    )
  }, [availableBatchesForDrug, selectedBatchId])

  const handleDrugChange = (drugId) => {
    setSelectedDrugId(drugId)
    const drug = drugsList.find((d) => d.drugId === drugId)
    if (drug && drug.batches?.length > 0) {
      const firstBatch = drug.batches[0]
      setSelectedBatchId(firstBatch.id)
      setTransferCode(firstBatch.batchIdentifier)
      setTransferQuantity(String(firstBatch.noOfPacks))
    } else {
      setSelectedBatchId("")
      setTransferCode("")
      setTransferQuantity("")
    }
  }

  const handleBatchChange = (batchId) => {
    setSelectedBatchId(batchId)
    const batch = availableBatchesForDrug.find((b) => b.id === batchId)
    if (batch) {
      setTransferCode(batch.batchIdentifier)
      setTransferQuantity(String(batch.noOfPacks))
    }
  }

  // Fetch available drugs catalog from /api/v1/batch
  React.useEffect(() => {
    let isMounted = true
    setIsLoadingDrugs(true)

    const fetchDrugs = async () => {
      try {
        const list = await getAvailableDrugs(activeToken)
        if (isMounted && list?.length > 0) {
          setDrugsList(list)
          if (!selectedDrugId || !list.some((d) => d.drugId === selectedDrugId)) {
            setSelectedDrugId(list[0].drugId)
            if (list[0].batches?.length > 0) {
              setSelectedBatchId(list[0].batches[0].id)
              setTransferCode(list[0].batches[0].batchIdentifier)
              setTransferQuantity(String(list[0].batches[0].noOfPacks))
            }
          }
        }
      } catch (err) {
        console.warn("[WholesalerDashboard] Failed to fetch drugs from /api/v1/batch:", err.message)
      } finally {
        if (isMounted) setIsLoadingDrugs(false)
      }
    }

    fetchDrugs()
    return () => {
      isMounted = false
    }
  }, [activeToken, isTransferOpen, isAvailableBatchesOpen])

  // Fetch recipients from /api/v1/wholesaler or /api/v1/retailer
  React.useEffect(() => {
    if (!isTransferOpen) return

    let isMounted = true
    setIsLoadingRecipients(true)

    const fetchStakeholders = async () => {
      try {
        if (recipientType === "wholesaler") {
          const list = await getWholesalers(activeToken)
          if (isMounted) {
            setRecipientsList(list)
            if (list.length > 0 && !transferDestination) {
              setSelectedRecipientId(getStakeholderId(list[0]))
              setTransferDestination(formatStakeholderLabel(list[0]))
            }
          }
        } else {
          const list = await getRetailers(activeToken)
          if (isMounted) {
            setRecipientsList(list)
            if (list.length > 0 && !transferDestination) {
              setSelectedRecipientId(getStakeholderId(list[0]))
              setTransferDestination(formatStakeholderLabel(list[0]))
            }
          }
        }
      } catch (err) {
        console.warn("[WholesalerDashboard] Failed to fetch stakeholders:", err.message)
      } finally {
        if (isMounted) setIsLoadingRecipients(false)
      }
    }

    fetchStakeholders()
    return () => {
      isMounted = false
    }
  }, [isTransferOpen, recipientType, activeToken])

  const handleRecipientTypeChange = (type) => {
    setRecipientType(type)
    setSelectedRecipientId("")
    setTransferDestination("")
  }

  const handleScanPallet = async (e) => {
    e.preventDefault()
    if (!scanCode.trim()) return

    setIsScanning(true)
    setScanResult(null)

    try {
      const targetCode = scanCode.trim()
      const result = await verifyMedicine({
        type: verificationType,
        code: targetCode,
      })

      const newShipment = {
        id: `SHP-2026-${Math.floor(100 + Math.random() * 900)}`,
        product: result.name || "Authenticated Consignment",
        lot: result.lot || targetCode.toUpperCase(),
        units: "Verified Consignment",
        manufacturer: result.manufacturer || "Certified Node",
        status: "RECEIVED_AUTHENTIC",
        time: "Just now",
      }
      setShipments([newShipment, ...shipments])
      setScanCode("")

      if (verificationType === "batch") {
        navigate(`/batch/${encodeURIComponent(result.lot || targetCode)}`, {
          state: { batchData: result },
        })
        return
      }

      setScanResult({
        success: true,
        message: `Consignment verified [${verificationType.toUpperCase()}]. Origin validated from ${result.manufacturer}.`,
        details: newShipment,
      })
    } catch (err) {
      console.warn("[WholesalerDashboard] Consignment scan error:", err.message)
      setScanResult({
        success: false,
        message: err.message || `Unrecognized or unauthorized identifier: "${scanCode}". Flagged for quarantine.`,
        details: null,
      })
    } finally {
      setIsScanning(false)
    }
  }

  const filteredShipments = shipments.filter(
    (s) =>
      s.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleExecuteTransfer = async (e) => {
    e.preventDefault()
    setTransferError("")
    setTransferSuccess("")

    const destination = transferDestination.trim()
    if (!destination) {
      setTransferError("Please select an authorized recipient destination node.")
      return
    }

    const batchUuid =
      selectedBatch?.id || selectedBatch?.batchId || selectedBatch?.UUID || selectedBatchId
    if (!batchUuid) {
      setTransferError("Please select a pharmaceutical drug batch to transfer.")
      return
    }

    const receiverOrganisationId =
      selectedRecipientId ||
      recipientsList.find((r) => formatStakeholderLabel(r) === destination)?.UUID ||
      recipientsList.find((r) => formatStakeholderLabel(r) === destination)?.id ||
      ""

    if (!receiverOrganisationId) {
      setTransferError("Please select a valid receiver organisation.")
      return
    }

    const drugName = selectedDrug ? selectedDrug.drugBrandName : "Pharmaceutical Consignment"
    const batchIdentifier = selectedBatch
      ? selectedBatch.batchIdentifier
      : transferCode.trim().toUpperCase() || "AAOB1"
    const verificationCode = selectedBatch?.verificationCode || ""
    const manufacturer = selectedDrug ? selectedDrug.drugManufacturerName : "Authorized Wholesaler Depot"
    const parsedQty = parseInt(transferQuantity, 10)
    const validQtyNum =
      transferType === "batch"
        ? (selectedBatch?.noOfPacks || parsedQty || 50)
        : (!isNaN(parsedQty) && parsedQty > 0 ? parsedQty : (selectedBatch?.noOfPacks || 50))
    const qty = `${validQtyNum} Packs`

    setIsTransferring(true)

    try {
      let recordTime = "Just now"

      if (transferType === "batch") {
        const response = await transferBatch({
          batchId: batchUuid,
          receiverOrganisationId,
          token: activeToken,
        })
        if (response?.timestamp) {
          try {
            recordTime = new Date(response.timestamp).toLocaleString("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            })
          } catch {
            recordTime = response.timestamp
          }
        }
      }

      const confirmationMsg = `The batch has been successfully transferred to ${destination}`

      const newShipment = {
        id: `SHP-2026-${Math.floor(100 + Math.random() * 900)}`,
        product: `${drugName} (${qty})`,
        lot: batchIdentifier,
        verificationCode: verificationCode,
        units: qty,
        manufacturer: manufacturer,
        destination: destination,
        recipientType: recipientType.toUpperCase(),
        status: "VERIFIED_IN_TRANSIT",
        time: recordTime,
      }

      setShipments((prev) => [newShipment, ...prev])
      setIsTransferOpen(false)
      setTransferSuccess("")
      setTransferError("")
      setTransferCode("")
      setTransferDestination("")
      setTransferQuantity("")
      setSelectedRecipientId("")

      setTransferConfirmationPopup({
        message: confirmationMsg,
        receiverName: destination,
        batchIdentifier,
        drugName,
        quantity: qty,
      })
    } catch (err) {
      console.error("[WholesalerDashboard] Batch transfer error:", err)
      setTransferError(err.message || "Failed to transfer batch. Please try again.")
    } finally {
      setIsTransferring(false)
    }
  }

  const handleExportCSV = () => {
    const headers = "Shipment ID,Medication Description,Lot Number,Origin Manufacturer,Destination,Custody Status,Timestamp\n"
    const rows = shipments
      .map(
        (s) =>
          `"${s.id}","${s.product}","${s.lot}","${s.manufacturer}","${s.destination}","${s.status}","${s.time}"`
      )
      .join("\n")
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `MedCheck_Depot_Audit_Report_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const allFlattenedBatches = React.useMemo(() => {
    return drugsList.flatMap((drug) =>
      (drug.batches || []).map((batch) => ({
        ...batch,
        drug,
      }))
    )
  }, [drugsList])

  const filteredAvailableBatches = React.useMemo(() => {
    return allFlattenedBatches.filter((item) => {
      const q = batchSearchQuery.toLowerCase()
      return (
        item.drug.drugBrandName.toLowerCase().includes(q) ||
        item.drug.drugGenericName.toLowerCase().includes(q) ||
        item.drug.drugManufacturerName.toLowerCase().includes(q) ||
        item.batchIdentifier.toLowerCase().includes(q) ||
        (item.verificationCode && item.verificationCode.toLowerCase().includes(q))
      )
    })
  }, [allFlattenedBatches, batchSearchQuery])

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/60 text-slate-900">
      <NavigationBar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="tech-mono text-xs font-semibold text-[#0208F9] uppercase tracking-wider">
                Wholesale Logistics Console
              </span>
            </div>
            <h1 className="text-[2.25rem] font-bold tracking-[-0.03em] text-slate-900 leading-tight">
              Chain-of-Custody & Warehouse Audits
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Terminal: Lagos Central Depot Hub #04 • Licensed Distributor Node
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShipments([...INITIAL_SHIPMENTS])
                setScanResult(null)
              }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Ledger</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setTransferError("")
                setTransferSuccess("")
                setIsTransferOpen(true)
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Custody Transfer</span>
            </Button>
          </div>
        </div>

        {/* Quick Operations: Transfer Batches & Packs, Reports, Available Batches with Packs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 flex flex-col justify-between border-slate-200 shadow-sm hover:border-[#0208F9]/40 hover:shadow-md transition-all bg-white">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider tech-mono text-slate-500">
                  Custody Transfer
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0208F9] flex items-center justify-center">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Transfer Batches & Packs
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Initiate chain-of-custody transfer of batches and serialized packs to downstream pharmacy nodes.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100">
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setTransferError("")
                  setTransferSuccess("")
                  setIsTransferOpen(true)
                }}
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                <span>Transfer Batches & Packs</span>
              </Button>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between border-slate-200 shadow-sm hover:border-emerald-500/40 hover:shadow-md transition-all bg-white">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider tech-mono text-slate-500">
                  Compliance & Audits
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reports
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  View and export depot audit logs, chain-of-custody certificates, and compliance reports.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                className="w-full border-slate-300 hover:bg-slate-50 text-slate-900"
                onClick={() => setIsReportsOpen(true)}
              >
                <FileText className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Reports</span>
              </Button>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between border-slate-200 shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all bg-white">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider tech-mono text-slate-500">
                  Depot Inventory
                </span>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Boxes className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Available Batches with Packs
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect authorized in-stock batches, pack counts, and cryptographic unit manifests.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                className="w-full border-slate-300 hover:bg-slate-50 text-slate-900"
                onClick={() => setIsAvailableBatchesOpen(true)}
              >
                <Boxes className="w-4 h-4 mr-2 text-indigo-600" />
                <span>Get Available Batches with Packs</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Pallet Barcode & Consignment Scanner */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-center gap-2">
              <ScanBarcode className="w-5 h-5 text-[#0208F9]" />
              <CardTitle className="text-lg font-bold">
                Depot Inbound / Outbound Consignment Scanner
              </CardTitle>
            </div>
            <CardDescription>
              Scan incoming shipment barcodes or enter batch numbers to verify tamper seals and transfer custody
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-2">
            <form onSubmit={handleScanPallet} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <VerificationTypeSelect
                    value={verificationType}
                    onChange={(newType) => setVerificationType(newType)}
                  />
                </div>
                <div className="sm:col-span-8 flex flex-col sm:flex-row gap-3 items-end">
                  <div className="flex-1 w-full">
                    <Input
                      label="Scan Identifier or Barcode"
                      placeholder="e.g. PAOPzHy7Hp1dIHE8 or LOT-2026-AMX-910"
                      value={scanCode}
                      onChange={(e) => setScanCode(e.target.value)}
                      className="tech-mono text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    size="default"
                    disabled={isScanning}
                    className="shrink-0 w-full sm:w-auto"
                  >
                    <ScanBarcode className="w-4 h-4" />
                    <span>{isScanning ? "Validating..." : "Verify Consignment"}</span>
                  </Button>
                </div>
              </div>
            </form>

            {scanResult && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs ${
                  scanResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {scanResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{scanResult.message}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consignment Ledger Table */}
        {/* <Card className="p-6">
          ...
        </Card> */}

        {/* Modal 1: Transfer Batches & Packs */}
        {isTransferOpen && (
          <div
            className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget && !isTransferring) {
                setIsTransferOpen(false)
                setTransferError("")
                setTransferSuccess("")
              }
            }}
          >
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex flex-col shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
              <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-slate-100 shrink-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0208F9] flex items-center justify-center shrink-0">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">
                      Transfer Batches & Packs
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Log chain-of-custody handoff to authorized pharmacies and distribution hubs
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!isTransferring) {
                      setIsTransferOpen(false)
                      setTransferError("")
                      setTransferSuccess("")
                    }
                  }}
                  disabled={isTransferring}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 shrink-0 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleExecuteTransfer} className="flex-1 flex flex-col overflow-hidden min-h-0">
                <div className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
                  {transferSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{transferSuccess}</span>
                    </div>
                  )}

                  {transferError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800 font-medium">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{transferError}</span>
                    </div>
                  )}
                {/* 1. Recipient Entity Category (Wholesaler vs Retailer) */}
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider tech-mono text-slate-500 block">
                        Step 1: Recipient Stakeholder Category
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                        Who is this consignment being transferred to?
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0208F9] text-[10px] font-bold tech-mono">
                      /api/v1/{recipientType}
                    </span>
                  </div>

                  {/* Recipient Type Choice Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRecipientTypeChange("retailer")}
                      className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        recipientType === "retailer"
                          ? "bg-white border-emerald-500 text-slate-900 ring-2 ring-emerald-500/20 shadow-xs"
                          : "bg-slate-100/70 border-slate-200 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${recipientType === "retailer" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">
                          Retailer
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                          Pharmacies, dispensaries & chemists
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRecipientTypeChange("wholesaler")}
                      className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        recipientType === "wholesaler"
                          ? "bg-white border-[#0208F9] text-slate-900 ring-2 ring-blue-500/20 shadow-xs"
                          : "bg-slate-100/70 border-slate-200 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${recipientType === "wholesaler" ? "bg-blue-100 text-[#0208F9]" : "bg-slate-200 text-slate-500"}`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">
                          Wholesaler
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                          Regional distribution & transit depots
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Recipient Node Selector (Powered by /api/v1/wholesaler or /api/v1/retailer) */}
                  <div className="pt-2 border-t border-slate-200">
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Select Registered {recipientType === "wholesaler" ? "Wholesaler" : "Retailer"}
                    </label>

                    {isLoadingRecipients ? (
                      <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-500">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0208F9]" />
                        <span>Querying /api/v1/{recipientType} directory...</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <select
                          value={selectedRecipientId}
                          onChange={(e) => {
                            const val = e.target.value
                            setSelectedRecipientId(val)
                            const found = recipientsList.find((r) => getStakeholderId(r) === String(val))
                            if (found) {
                              setTransferDestination(formatStakeholderLabel(found))
                            } else {
                              setTransferDestination("")
                            }
                          }}
                          className="w-full text-xs rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0208F9]"
                          required
                        >
                          <option value="">
                            -- Select registered {recipientType} ({recipientsList.length} verified) --
                          </option>
                          {recipientsList.map((r) => {
                            const rId = getStakeholderId(r)
                            return (
                              <option key={rId} value={rId}>
                                {formatStakeholderLabel(r)}
                              </option>
                            )
                          })}
                        </select>

                        {transferDestination && (
                          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="truncate">
                              <span className="font-semibold">Destination Node: </span>
                              <span>{transferDestination}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Pick Drug to Transfer */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Step 2: Select Pharmaceutical Product
                    </label>
                    <span className="text-[11px] text-slate-400 tech-mono">
                      {drugsList.length} Registered Drugs
                    </span>
                  </div>

                  {isLoadingDrugs ? (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0208F9]" />
                      <span>Loading drug catalog...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <select
                        value={selectedDrugId}
                        onChange={(e) => handleDrugChange(e.target.value)}
                        className="w-full text-xs rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0208F9]"
                        required
                      >
                        <option value="">-- Choose Drug to Transfer --</option>
                        {drugsList.map((d) => (
                          <option key={d.drugId} value={d.drugId}>
                            {d.drugBrandName} ({d.drugGenericName}) — {d.drugManufacturerName}
                          </option>
                        ))}
                      </select>

                      {selectedDrug && (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-bold text-slate-900 block">
                                {selectedDrug.drugBrandName}
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                {selectedDrug.drugGenericName}
                              </span>
                            </div>
                            <span className="text-[10px] tech-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                              NAFDAC: {selectedDrug.drugNafdacNumber}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2 pt-0.5">
                            {selectedDrug.drugDescription}
                          </p>
                          <div className="text-[10px] text-slate-400 tech-mono pt-0.5">
                            Manufacturer: {selectedDrug.drugManufacturerName}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Pick Batch of Selected Drug */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Step 3: Select Batch of {selectedDrug ? selectedDrug.drugBrandName : "Drug"}
                    </label>
                    <span className="text-[11px] text-slate-400 tech-mono">
                      {availableBatchesForDrug.length} Available Batches
                    </span>
                  </div>

                  {availableBatchesForDrug.length === 0 ? (
                    <div className="p-3 text-xs text-amber-700 bg-amber-50 rounded-xl border border-amber-200">
                      No active batches found in depot inventory for this medication.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <select
                        value={selectedBatchId}
                        onChange={(e) => handleBatchChange(e.target.value)}
                        className="w-full text-xs rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0208F9]"
                        required
                      >
                        <option value="">-- Choose Batch / Lot Number --</option>
                        {availableBatchesForDrug.map((b) => (
                          <option key={b.id} value={b.id}>
                            Batch: {b.batchIdentifier} • {b.noOfPacks} Packs Available • Expiry: {b.expirationDate}
                          </option>
                        ))}
                      </select>

                      {selectedBatch && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px]">
                            <span className="text-[9px] uppercase font-bold text-blue-600 tech-mono block">
                              Batch Identifier
                            </span>
                            <span className="font-bold text-blue-950 tech-mono block mt-0.5">
                              {selectedBatch.batchIdentifier}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px]">
                            <span className="text-[9px] uppercase font-bold text-blue-600 tech-mono block">
                              Verification Code
                            </span>
                            <span className="font-bold text-blue-950 tech-mono block mt-0.5 truncate">
                              {selectedBatch.verificationCode}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px]">
                            <span className="text-[9px] uppercase font-bold text-emerald-600 tech-mono block">
                              Available In Depot
                            </span>
                            <span className="font-bold text-emerald-950 block mt-0.5">
                              {selectedBatch.noOfPacks} Packs
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                            <span className="text-[9px] uppercase font-bold text-slate-500 tech-mono block">
                              Mfg Date
                            </span>
                            <span className="font-medium text-slate-800 tech-mono block mt-0.5">
                              {selectedBatch.manufactureDate}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                            <span className="text-[9px] uppercase font-bold text-slate-500 tech-mono block">
                              Expiry Date
                            </span>
                            <span className="font-medium text-slate-800 tech-mono block mt-0.5">
                              {selectedBatch.expirationDate}
                            </span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
                            <span className="text-[9px] uppercase font-bold text-slate-500 tech-mono block">
                              Audit Scans
                            </span>
                            <span className="font-medium text-slate-800 tech-mono block mt-0.5">
                              {selectedBatch.verificationCount} scans
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 4. Transfer Scope (Row 1) */}
                <div className="pt-1">
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Step 4: Transfer Scope
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTransferType("batch")
                        if (selectedBatch) {
                          setTransferQuantity(String(selectedBatch.noOfPacks))
                        }
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                        transferType === "batch"
                          ? "bg-[#0208F9] text-white border-[#0208F9]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Entire Batch ({selectedBatch?.noOfPacks || 0} Packs)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTransferType("pack")
                        if (selectedBatch) {
                          setTransferQuantity(String(Math.min(10, selectedBatch.noOfPacks || 10)))
                        }
                      }}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                        transferType === "pack"
                          ? "bg-[#0208F9] text-white border-[#0208F9]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Partial Unit Packs
                    </button>
                  </div>
                </div>

                {/* 5. Quantity / Allocation Units (Separate Row - only visible when not Entire Batch) */}
                {transferType !== "batch" && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Step 5: Quantity (Numeric Packs)
                      </label>
                      {selectedBatch && (
                        <span className="text-[11px] text-slate-400 tech-mono">
                          Available: {selectedBatch.noOfPacks} Packs
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min={1}
                        max={selectedBatch?.noOfPacks || undefined}
                        placeholder="e.g. 50"
                        value={transferQuantity}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, "")
                          setTransferQuantity(val)
                        }}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", "."].includes(e.key)) {
                            e.preventDefault()
                          }
                        }}
                        className="text-xs tech-mono pr-14"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none select-none">
                        Packs
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:px-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!isTransferring) {
                      setIsTransferOpen(false)
                      setTransferError("")
                      setTransferSuccess("")
                    }
                  }}
                  disabled={isTransferring}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default" size="sm" disabled={isTransferring}>
                  {isTransferring ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                      <span>Transferring Batch...</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeftRight className="w-3.5 h-3.5 mr-1" />
                      <span>Confirm Custody Transfer</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

        {/* Confirmation Message Popup */}
        {transferConfirmationPopup && (
          <div
            className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
            onClick={() => setTransferConfirmationPopup(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setTransferConfirmationPopup(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Transfer Confirmed
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                The batch has been successfully transferred to{" "}
                <span className="font-bold text-slate-950">
                  {transferConfirmationPopup.receiverName}
                </span>
              </p>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono">
                    Batch Identifier
                  </span>
                  <span className="font-bold text-slate-900 tech-mono">
                    {transferConfirmationPopup.batchIdentifier}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono">
                    Receiver
                  </span>
                  <span className="font-medium text-slate-800 truncate max-w-[200px]">
                    {transferConfirmationPopup.receiverName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono">
                    Custody Status
                  </span>
                  <span className="font-semibold text-emerald-700 tech-mono text-[11px]">
                    VERIFIED_IN_TRANSIT
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="default"
                className="w-full bg-[#0208F9] hover:bg-[#0208F9]/90"
                onClick={() => setTransferConfirmationPopup(null)}
              >
                Done
              </Button>
            </div>
          </div>
        )}

        {/* Modal 2: Reports */}
        {isReportsOpen && (
          <div
            className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsReportsOpen(false)
            }}
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex flex-col shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
              <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-slate-100 shrink-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">
                      Wholesale Depot Compliance & Audit Report
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Terminal: Lagos Central Depot Hub #04 • Licensed Distributor Node
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors shrink-0 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Report Body */}
              <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5">
                {/* Compliance & Telemetry Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tech-mono block">
                      Logged Transfers
                    </span>
                    <span className="text-xl font-bold text-slate-900 mt-1 block">
                      {shipments.length}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">100% genuine</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tech-mono block">
                      Depot Batches
                    </span>
                    <span className="text-xl font-bold text-slate-900 mt-1 block">
                      {allFlattenedBatches.length}
                    </span>
                    <span className="text-[10px] text-slate-500">Active lots</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tech-mono block">
                      Quarantined
                    </span>
                    <span className="text-xl font-bold text-slate-900 mt-1 block">0</span>
                    <span className="text-[10px] text-emerald-600 font-medium">Clean corridor</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tech-mono block">
                      Audit Status
                    </span>
                    <span className="text-xl font-bold text-emerald-700 tech-mono mt-1 block">
                      PASS
                    </span>
                    <span className="text-[10px] text-slate-400 tech-mono">NAFDAC-ALIGNED</span>
                  </div>
                </div>

                {/* Recent Ledger Audit Summary */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 tech-mono">
                      Recent Custody Ledger Entries
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {shipments.length} total records
                    </span>
                  </div>
                  <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 tech-mono text-[11px]">
                        <tr>
                          <th className="p-2.5">ID</th>
                          <th className="p-2.5">Product & Lot</th>
                          <th className="p-2.5">Destination</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {shipments.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/80">
                            <td className="p-2.5 tech-mono font-semibold text-[#0208F9]">
                              {s.id}
                            </td>
                            <td className="p-2.5">
                              <span className="font-medium text-slate-900 block truncate max-w-[200px]">
                                {s.product}
                              </span>
                              <span className="text-[10px] tech-mono text-slate-500 block">
                                {s.lot}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-600 truncate max-w-[140px]">
                              {s.destination}
                            </td>
                            <td className="p-2.5">
                              <span className="tech-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Report Actions */}
              <div className="p-4 sm:px-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    className="w-full sm:w-auto"
                  >
                    <Download className="w-3.5 h-3.5 mr-1 text-slate-600" />
                    <span>Export CSV</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1 text-slate-600" />
                    <span>Print Report</span>
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => setIsReportsOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 3: Available Batches with Packs */}
        {isAvailableBatchesOpen && (
          <div
            className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsAvailableBatchesOpen(false)
            }}
          >
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex flex-col shadow-2xl border border-slate-200 relative my-auto animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
              <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-slate-100 shrink-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">
                      Available Batches with Packs
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Depot stock inventory of verified pharmaceutical lots and serialized unit packs
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAvailableBatchesOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors shrink-0 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Inventory List Body */}
              <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-4">

                {/* Search Bar */}
                <div>
                  <Input
                    placeholder="Search available batches, medications, or manufacturers..."
                    value={batchSearchQuery}
                    onChange={(e) => setBatchSearchQuery(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>

                {/* Batches & Packs List */}
                <div className="space-y-3 pr-1">
                {filteredAvailableBatches.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No batches found matching "{batchSearchQuery}".
                  </div>
                ) : (
                  filteredAvailableBatches.map((item) => (
                    <div
                      key={item.id || item.batchIdentifier}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0208F9]/40 transition-all shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">
                              {item.drug.drugBrandName}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              ({item.drug.drugGenericName})
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold tech-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                              VERIFIED LOT
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 mt-0.5 block">
                            Manufactured by {item.drug.drugManufacturerName} • NAFDAC: {item.drug.drugNafdacNumber}
                          </span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDrugId(item.drug.drugId)
                            setSelectedBatchId(item.id)
                            setTransferCode(item.batchIdentifier)
                            setTransferQuantity(String(item.noOfPacks))
                            setTransferType("batch")
                            setTransferError("")
                            setTransferSuccess("")
                            setIsAvailableBatchesOpen(false)
                            setIsTransferOpen(true)
                          }}
                          className="shrink-0 text-xs border-[#0208F9]/30 text-[#0208F9] hover:bg-blue-50"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5 mr-1" />
                          <span>Transfer Batch</span>
                        </Button>
                      </div>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono block">
                            Batch Identifier
                          </span>
                          <span className="font-bold text-slate-800 tech-mono text-xs mt-0.5 block">
                            {item.batchIdentifier}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono block">
                            Verification Code
                          </span>
                          <span className="font-bold text-slate-800 tech-mono text-xs mt-0.5 block truncate">
                            {item.verificationCode}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono block">
                            In-Stock Packs
                          </span>
                          <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                            {item.noOfPacks.toLocaleString()} Packs
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tech-mono block">
                            Expiry Date
                          </span>
                          <span className="font-bold text-slate-800 tech-mono text-xs mt-0.5 block">
                            {item.expirationDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                </div>
              </div>

              {/* Pinned Modal Footer */}
              <div className="p-4 sm:px-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-500">
                  Showing {filteredAvailableBatches.length} of {allFlattenedBatches.length} depot batches
                </span>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => setIsAvailableBatchesOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
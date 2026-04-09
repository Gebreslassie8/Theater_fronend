// Frontend/src/pages/Admin/theaters/ViewDocumentsModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Download,
    Eye,
    FileText,
    FileCheck,
    CreditCard,
    UserCheck,
    Building,
    ExternalLink,
    Shield,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';
import ReusableButton from '../../../components/Reusable/ReusableButton';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';

interface Document {
    id: string;
    name: string;
    type: string;
    url: string;
    icon: React.ElementType;
    description: string;
    uploadedDate?: string;
    status?: 'verified' | 'pending' | 'rejected';
    size?: string;
}

interface ViewDocumentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: {
        id: string;
        theaterName: string;
        ownerName: string;
        email?: string;
        phone?: string;
        documents?: {
            businessLicense?: string;
            taxId?: string;
            identityProof?: string;
            bankStatement?: string;
            certificateOfIncorporation?: string;
            insuranceCertificate?: string;
        };
    };
    onVerify?: (documentId: string, status: 'verified' | 'rejected') => void;
}

const ViewDocumentsModal: React.FC<ViewDocumentsModalProps> = ({
    isOpen,
    onClose,
    request,
    onVerify
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [downloading, setDownloading] = useState<string | null>(null);
    const [verifying, setVerifying] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [documentStatuses, setDocumentStatuses] = useState<Record<string, string>>({});

    const documents: Document[] = [
        {
            id: 'business-license',
            name: 'Business License',
            type: 'PDF',
            url: request.documents?.businessLicense || '/documents/sample-license.pdf',
            icon: Building,
            description: 'Official business registration certificate issued by government',
            uploadedDate: '2024-03-15',
            status: documentStatuses['business-license'] || 'pending',
            size: '2.4 MB'
        },
        {
            id: 'tax-id',
            name: 'Tax Identification Number',
            type: 'PDF',
            url: request.documents?.taxId || '/documents/sample-taxid.pdf',
            icon: FileCheck,
            description: 'Tax registration document for the business',
            uploadedDate: '2024-03-15',
            status: documentStatuses['tax-id'] || 'pending',
            size: '1.8 MB'
        },
        {
            id: 'identity-proof',
            name: 'Identity Proof',
            type: 'PDF',
            url: request.documents?.identityProof || '/documents/sample-id.pdf',
            icon: UserCheck,
            description: 'Owner/Representative government-issued ID',
            uploadedDate: '2024-03-15',
            status: documentStatuses['identity-proof'] || 'pending',
            size: '1.2 MB'
        }
    ];

    // Add bank statement if available
    if (request.documents?.bankStatement) {
        documents.push({
            id: 'bank-statement',
            name: 'Bank Statement',
            type: 'PDF',
            url: request.documents.bankStatement,
            icon: CreditCard,
            description: 'Latest bank statement for payment verification',
            uploadedDate: '2024-03-15',
            status: documentStatuses['bank-statement'] || 'pending',
            size: '3.1 MB'
        });
    }

    // Add certificate of incorporation if available
    if (request.documents?.certificateOfIncorporation) {
        documents.push({
            id: 'incorporation',
            name: 'Certificate of Incorporation',
            type: 'PDF',
            url: request.documents.certificateOfIncorporation,
            icon: Shield,
            description: 'Company incorporation certificate',
            uploadedDate: '2024-03-15',
            status: documentStatuses['incorporation'] || 'pending',
            size: '2.1 MB'
        });
    }

    const handleDownload = async (doc: Document) => {
        setDownloading(doc.id);
        try {
            // Simulate download delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In production, this would trigger actual file download
            const link = document.createElement('a');
            link.href = doc.url;
            link.download = `${request.theaterName}_${doc.name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSuccessMessage(`${doc.name} downloaded successfully!`);
            setShowSuccessPopup(true);
        } catch (error) {
            setSuccessMessage(`Failed to download ${doc.name}. Please try again.`);
            setShowSuccessPopup(true);
        } finally {
            setDownloading(null);
        }
    };

    const handlePreview = (doc: Document) => {
        // Open in new window for preview
        window.open(doc.url, '_blank', 'noopener,noreferrer');
    };

    const handleVerify = async (doc: Document, status: 'verified' | 'rejected') => {
        setVerifying(doc.id);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            setDocumentStatuses(prev => ({
                ...prev,
                [doc.id]: status
            }));

            if (onVerify) {
                onVerify(doc.id, status);
            }

            setSuccessMessage(`${doc.name} has been ${status}!`);
            setShowSuccessPopup(true);
        } catch (error) {
            setSuccessMessage(`Failed to verify ${doc.name}. Please try again.`);
            setShowSuccessPopup(true);
        } finally {
            setVerifying(null);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'verified':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        <AlertCircle className="h-3 w-3" />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <Clock className="h-3 w-3" />
                        Pending
                    </span>
                );
        }
    };

    const getVerifiedCount = () => {
        return documents.filter(doc => documentStatuses[doc.id] === 'verified').length;
    };

    const getTotalDocuments = () => {
        return documents.length;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Registration Documents
                                    </h2>
                                    <div className="flex items-center gap-4 mt-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {request.theaterName}
                                        </p>
                                        <div className="h-4 w-px bg-gray-300 dark:bg-dark-600" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Owner: {request.ownerName}
                                        </p>
                                        {request.email && (
                                            <>
                                                <div className="h-4 w-px bg-gray-300 dark:bg-dark-600" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {request.email}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* Verification Progress */}
                            <div className="px-6 pt-4 pb-2 bg-gray-50 dark:bg-dark-900/50 border-b border-gray-200 dark:border-dark-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Verification Progress
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {getVerifiedCount()} / {getTotalDocuments()} Verified
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(getVerifiedCount() / getTotalDocuments()) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {documents.map((doc, index) => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`bg-white dark:bg-dark-700 rounded-xl p-5 border-2 transition-all duration-300 ${documentStatuses[doc.id] === 'verified'
                                                ? 'border-green-500 shadow-lg shadow-green-500/10'
                                                : documentStatuses[doc.id] === 'rejected'
                                                    ? 'border-red-500 shadow-lg shadow-red-500/10'
                                                    : 'border-gray-200 dark:border-dark-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Icon */}
                                                <div className={`p-3 rounded-xl ${documentStatuses[doc.id] === 'verified'
                                                    ? 'bg-green-100 dark:bg-green-900/30'
                                                    : documentStatuses[doc.id] === 'rejected'
                                                        ? 'bg-red-100 dark:bg-red-900/30'
                                                        : 'bg-indigo-100 dark:bg-indigo-900/30'
                                                    }`}>
                                                    <doc.icon className={`h-6 w-6 ${documentStatuses[doc.id] === 'verified'
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : documentStatuses[doc.id] === 'rejected'
                                                            ? 'text-red-600 dark:text-red-400'
                                                            : 'text-indigo-600 dark:text-indigo-400'
                                                        }`} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {doc.name}
                                                        </h3>
                                                        {getStatusBadge(documentStatuses[doc.id] || 'pending')}
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                        {doc.description}
                                                    </p>

                                                    {/* Metadata */}
                                                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                                                        {doc.uploadedDate && (
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                <span>{doc.uploadedDate}</span>
                                                            </div>
                                                        )}
                                                        {doc.size && (
                                                            <div className="flex items-center gap-1">
                                                                <FileText className="h-3 w-3" />
                                                                <span>{doc.size}</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-1">
                                                            <FileCheck className="h-3 w-3" />
                                                            <span>{doc.type}</span>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <ReusableButton
                                                            variant="info"
                                                            size="sm"
                                                            onClick={() => handlePreview(doc)}
                                                            icon={<Eye className="h-4 w-4" />}
                                                            isLoading={false}
                                                        >
                                                            Preview
                                                        </ReusableButton>
                                                        <ReusableButton
                                                            variant="primary"
                                                            size="sm"
                                                            onClick={() => handleDownload(doc)}
                                                            icon={<Download className="h-4 w-4" />}
                                                            isLoading={downloading === doc.id}
                                                        >
                                                            {downloading === doc.id ? 'Downloading...' : 'Download'}
                                                        </ReusableButton>
                                                        {documentStatuses[doc.id] !== 'verified' && (
                                                            <ReusableButton
                                                                variant="success"
                                                                size="sm"
                                                                onClick={() => handleVerify(doc, 'verified')}
                                                                icon={<CheckCircle className="h-4 w-4" />}
                                                                isLoading={verifying === doc.id}
                                                            >
                                                                Verify
                                                            </ReusableButton>
                                                        )}
                                                        {documentStatuses[doc.id] !== 'rejected' && (
                                                            <ReusableButton
                                                                variant="error"
                                                                size="sm"
                                                                onClick={() => handleVerify(doc, 'rejected')}
                                                                icon={<AlertCircle className="h-4 w-4" />}
                                                                isLoading={verifying === doc.id}
                                                            >
                                                                Reject
                                                            </ReusableButton>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Verification Notes */}
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                                Verification Checklist
                                            </h4>
                                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Verify business license is valid and not expired
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Check if tax ID matches business registration
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Confirm identity proof matches the owner name
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Validate bank account details for payments
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Ensure all documents are clear and readable
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900/50">
                                <ReusableButton
                                    variant="secondary"
                                    onClick={onClose}
                                >
                                    Close
                                </ReusableButton>
                                <ReusableButton
                                    variant="success"
                                    icon={<ExternalLink className="h-4 w-4" />}
                                    onClick={() => {
                                        const allVerified = documents.every(doc => documentStatuses[doc.id] === 'verified');
                                        if (allVerified) {
                                            setSuccessMessage('All documents have been verified successfully!');
                                            setShowSuccessPopup(true);
                                        } else {
                                            setSuccessMessage(`Please verify ${getTotalDocuments() - getVerifiedCount()} more document(s) before completing.`);
                                            setShowSuccessPopup(true);
                                        }
                                    }}
                                >
                                    Complete Verification
                                </ReusableButton>
                            </div>
                        </motion.div>
                    </div>

                    {/* Success Popup */}
                    <SuccessPopup
                        isOpen={showSuccessPopup}
                        onClose={() => setShowSuccessPopup(false)}
                        message={successMessage}
                        duration={3000}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};

export default ViewDocumentsModal;
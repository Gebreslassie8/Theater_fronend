// src/components/Reusable/SuccessPopup.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    message: string;
    duration?: number;
}

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    type?: ToastType;
    title?: string;
    message?: string;
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

// Individual Toast Component
const Toast: React.FC<{
    toast: ToastMessage;
    onClose: (id: string) => void;
}> = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, toast.duration || 5000);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onClose]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case 'info':
                return <Info className="h-5 w-5 text-blue-500" />;
            default:
                return <CheckCircle className="h-5 w-5 text-green-500" />;
        }
    };

    const getBgColor = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'info':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-green-50 border-green-200';
        }
    };

    const getTextColor = () => {
        switch (toast.type) {
            case 'success':
                return 'text-green-800';
            case 'error':
                return 'text-red-800';
            case 'warning':
                return 'text-yellow-800';
            case 'info':
                return 'text-blue-800';
            default:
                return 'text-green-800';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border ${getBgColor()} min-w-[320px] max-w-md relative`}
        >
            <div className="flex-shrink-0">
                {getIcon()}
            </div>
            <div className="flex-1">
                <h4 className={`font-semibold text-sm ${getTextColor()}`}>{toast.title}</h4>
                <p className={`text-xs mt-0.5 ${getTextColor()} opacity-80`}>{toast.message}</p>
            </div>
            <button
                onClick={() => onClose(toast.id)}
                className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition"
            >
                <X className="h-3 w-3 text-gray-500" />
            </button>
        </motion.div>
    );
};

// Toast Container for multiple toasts
export const ToastContainer: React.FC<{
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}> = ({ position = 'top-right' }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (toast: Omit<ToastMessage, 'id'>) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { ...toast, id }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Make addToast available globally
    useEffect(() => {
        (window as any).showToast = addToast;
        return () => {
            delete (window as any).showToast;
        };
    }, []);

    const getPositionClasses = () => {
        switch (position) {
            case 'top-right':
                return 'top-4 right-4';
            case 'top-left':
                return 'top-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'top-center':
                return 'top-4 left-1/2 -translate-x-1/2';
            case 'bottom-center':
                return 'bottom-4 left-1/2 -translate-x-1/2';
            default:
                return 'top-4 right-4';
        }
    };

    return (
        <div className={`fixed z-50 flex flex-col gap-3 ${getPositionClasses()}`}>
            <AnimatePresence>
                {toasts.map(toast => (
                    <Toast key={toast.id} toast={toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Single Modal Popup Component
const SuccessPopup: React.FC<SuccessPopupProps> = ({
    isOpen,
    onClose,
    type = 'success',
    title = 'Success!',
    message = 'Operation completed successfully',
    duration = 3000,
    position = 'top-right'
}) => {
    useEffect(() => {
        if (isOpen && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-12 w-12 text-green-500" />;
            case 'error':
                return <XCircle className="h-12 w-12 text-red-500" />;
            case 'warning':
                return <AlertCircle className="h-12 w-12 text-yellow-500" />;
            case 'info':
                return <Info className="h-12 w-12 text-blue-500" />;
            default:
                return <CheckCircle className="h-12 w-12 text-green-500" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'info':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-green-50 border-green-200';
        }
    };

    const getTitleColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-800';
            case 'error':
                return 'text-red-800';
            case 'warning':
                return 'text-yellow-800';
            case 'info':
                return 'text-blue-800';
            default:
                return 'text-green-800';
        }
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'top-right':
                return 'top-4 right-4';
            case 'top-left':
                return 'top-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'top-center':
                return 'top-4 left-1/2 -translate-x-1/2';
            case 'bottom-center':
                return 'bottom-4 left-1/2 -translate-x-1/2';
            default:
                return 'top-4 right-4';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed z-50 ${getPositionClasses()}`}
                >
                    <div className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border ${getBgColor()} min-w-[320px] max-w-md`}>
                        <div className="flex-shrink-0">
                            {getIcon()}
                        </div>
                        <div className="flex-1">
                            <h4 className={`font-semibold text-sm ${getTitleColor()}`}>{title}</h4>
                            <p className={`text-xs mt-0.5 ${getTitleColor()} opacity-80`}>{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition"
                        >
                            <X className="h-3 w-3 text-gray-500" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Hook for using toasts
export const useToast = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (toast: Omit<ToastMessage, 'id'>) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { ...toast, id }]);

        if (toast.duration !== 0) {
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, toast.duration || 5000);
        }
    };

    const success = (message: string, title: string = 'Success!') => {
        showToast({ type: 'success', title, message });
    };

    const error = (message: string, title: string = 'Error!') => {
        showToast({ type: 'error', title, message });
    };

    const warning = (message: string, title: string = 'Warning!') => {
        showToast({ type: 'warning', title, message });
    };

    const info = (message: string, title: string = 'Info') => {
        showToast({ type: 'info', title, message });
    };

    return { success, error, warning, info, toasts, setToasts };
};

export default SuccessPopup;
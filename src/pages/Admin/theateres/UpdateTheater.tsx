// src/pages/Admin/theaters/UpdateTheater.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, Mail, AlertCircle, User, Phone, MapPin, Hash, Users, Shield } from 'lucide-react';
import * as Yup from 'yup';
import ReusableForm from '../../../components/Reusable/ReusableForm';
import ButtonStyle from '../../../components/Reusable/ButtonStyle';
import Colors from '../../../components/Reusable/Colors';

interface Theater {
    id: number;
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    location: string;
    status: 'Active' | 'Inactive' | 'Pending';
    totalRevenue: number;
    totalBookings: number;
    rating: number;
    joinDate: string;
    lastActive: string;
    screens?: number;
    capacity?: number;
}

interface UpdateTheaterProps {
    theater: Theater;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (data: any) => void;
}

const ValidationSchema = Yup.object({
    name: Yup.string()
        .required('Theater name is required')
        .min(2, 'Theater name must be at least 2 characters'),
    ownerName: Yup.string()
        .required('Owner name is required')
        .min(2, 'Owner name must be at least 2 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9+\-\s()]{10,15}$/, 'Please enter a valid phone number'),
    location: Yup.string().required('Location is required'),
    screens: Yup.number().min(0).max(50),
    capacity: Yup.number().min(0).max(10000),
    status: Yup.string().required('Status is required'),
});

const ReusableButton: React.FC<any> = ({
    onClick,
    type = 'button',
    children,
    variant = 'primary',
    className = '',
    disabled = false,
    loading = false
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const getButtonStyle = () => {
        if (variant === 'secondary') {
            return {
                backgroundColor: isHovered ? Colors.lightGray : Colors.white,
                color: Colors.error,
                transition: 'all 0.3s ease',
                border: `2px solid ${Colors.error}`,
                transform: isPressed ? 'scale(0.98)' : 'scale(1)',
            };
        }
        if (variant === 'danger') {
            return {
                backgroundColor: isHovered ? Colors.error : Colors.red,
                color: Colors.white,
                transition: 'all 0.3s ease',
                border: 'none',
                transform: isPressed ? 'scale(0.98)' : 'scale(1)',
            };
        }
        return {
            backgroundColor: isHovered ? ButtonStyle.hoverBackgroundColor : ButtonStyle.backgroundColor,
            color: ButtonStyle.color,
            transition: 'all 0.3s ease',
            border: 'none',
            transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        };
    };

    const buttonStyle = getButtonStyle();

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${ButtonStyle.base} ${className} relative overflow-hidden`}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                </div>
            ) : (
                children
            )}
            {isHovered && variant === 'primary' && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
            )}
        </button>
    );
};

const FormInput: React.FC<{
    label: string;
    name: string;
    type: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
    error?: string;
    touched?: boolean;
    placeholder?: string;
    icon?: React.ReactNode;
    required?: boolean;
}> = ({ label, name, type, value, onChange, onBlur, error, touched, placeholder, icon, required }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-2.5 border ${error && touched ? 'border-red-500' : 'border-gray-200'
                        } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white group-focus-within:bg-white`}
                />
            </div>
            {error && touched && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                </motion.p>
            )}
        </div>
    );
};

const FormSelect: React.FC<{
    label: string;
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
    error?: string;
    touched?: boolean;
    options: { value: string; label: string }[];
    required?: boolean;
}> = ({ label, name, value, onChange, onBlur, error, touched, options, required }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full px-4 py-2.5 border ${error && touched ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white`}
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && touched && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                </motion.p>
            )}
        </div>
    );
};

const UpdateTheater: React.FC<UpdateTheaterProps> = ({ theater, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        ownerName: '',
        email: '',
        phone: '',
        location: '',
        screens: '',
        capacity: '',
        status: '',
    });

    useEffect(() => {
        if (theater) {
            setFormData({
                name: theater.name,
                ownerName: theater.ownerName,
                email: theater.email,
                phone: theater.phone,
                location: theater.location,
                screens: theater.screens?.toString() || '',
                capacity: theater.capacity?.toString() || '',
                status: theater.status,
            });
        }
    }, [theater]);

    const formFields = [
        { name: 'name', type: 'text', label: 'Theater Name', placeholder: 'Enter theater name', required: true, icon: <Building className="h-4 w-4" /> },
        { name: 'ownerName', type: 'text', label: 'Owner Name', placeholder: 'Enter owner name', required: true, icon: <User className="h-4 w-4" /> },
        { name: 'email', type: 'email', label: 'Email Address', placeholder: 'Enter email address', required: true, icon: <Mail className="h-4 w-4" /> },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: 'Enter phone number', required: true, icon: <Phone className="h-4 w-4" /> },
        { name: 'location', type: 'text', label: 'Location', placeholder: 'Enter theater location', required: true, icon: <MapPin className="h-4 w-4" /> },
        { name: 'screens', type: 'number', label: 'Number of Screens', placeholder: 'Enter number of screens', required: false, icon: <Hash className="h-4 w-4" /> },
        { name: 'capacity', type: 'number', label: 'Total Capacity', placeholder: 'Enter total capacity', required: false, icon: <Users className="h-4 w-4" /> },
        {
            name: 'status', type: 'select', label: 'Status', required: true, options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Pending', label: 'Pending' },
            ]
        },
    ];

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        await onUpdate({ ...values, id: theater.id });
        setSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-teal-100 rounded-lg">
                                <Building className="h-5 w-5 text-teal-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Update Theater</h2>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="mb-6 flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-blue-700">Update theater information. Fields marked with <span className="text-red-500">*</span> are required.</p>
                        </div>

                        <ReusableForm
                            id="update-theater-form"
                            fields={formFields}
                            onSubmit={handleSubmit}
                            initialValues={formData}
                            validationSchema={ValidationSchema}
                            render={(formik) => (
                                <div className="space-y-6">
                                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                        <div className="flex items-start gap-2">
                                            <Shield className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-medium text-purple-800">Status Information:</p>
                                                <p className="text-xs text-purple-700 mt-1">
                                                    {formik.values.status === 'Active' && 'Active theaters can operate and sell tickets.'}
                                                    {formik.values.status === 'Inactive' && 'Inactive theaters cannot operate until reactivated.'}
                                                    {formik.values.status === 'Pending' && 'Pending theaters are awaiting admin approval.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                        <ReusableButton type="button" variant="secondary" onClick={onClose} className="flex-1 py-2.5">Cancel</ReusableButton>
                                        <ReusableButton type="submit" variant="primary" disabled={formik.isSubmitting || !formik.isValid} loading={formik.isSubmitting} className="flex-1 py-2.5">
                                            <Building className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </ReusableButton>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UpdateTheater;
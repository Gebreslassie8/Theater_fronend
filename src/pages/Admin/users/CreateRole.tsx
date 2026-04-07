// src/pages/Admin/users/CreateRole.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    X,
    Shield,
    ShieldCheck,
    ShieldAlert,
    Crown,
    UserCog,
    Eye,
    Edit,
    Save,
    Plus,
    Trash2,
    Settings,
    Users,
    Ticket,
    Calendar,
    DollarSign,
    Building,
    BarChart3,
    MessageCircle,
    HelpCircle,
    FileText,
    Bell,
    Star,
    Award,
    TrendingUp,
    Activity,
    UserPlus,
    UserMinus,
    Search,
    Filter,
    Lock,
    Unlock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import ReusableButton from '../../../components/Reusable/ReusableButton';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';

// Types
interface Permission {
    id: string;
    name: string;
    module: string;
    description: string;
}

interface Module {
    id: string;
    name: string;
    icon: React.ElementType;
    permissions: Permission[];
}

interface CreateRoleProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (roleData: any) => void;
}

// Mock Permissions Data
const modules: Module[] = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: BarChart3,
        permissions: [
            { id: 'view_dashboard', name: 'View Dashboard', module: 'dashboard', description: 'Access to main dashboard' },
            { id: 'view_analytics', name: 'View Analytics', module: 'dashboard', description: 'Access to analytics and reports' },
            { id: 'export_reports', name: 'Export Reports', module: 'dashboard', description: 'Export dashboard data' }
        ]
    },
    {
        id: 'users',
        name: 'User Management',
        icon: Users,
        permissions: [
            { id: 'view_users', name: 'View Users', module: 'users', description: 'View list of all users' },
            { id: 'create_users', name: 'Create Users', module: 'users', description: 'Add new users to system' },
            { id: 'edit_users', name: 'Edit Users', module: 'users', description: 'Modify user information' },
            { id: 'delete_users', name: 'Delete Users', module: 'users', description: 'Remove users from system' },
            { id: 'manage_roles', name: 'Manage Roles', module: 'users', description: 'Create and edit roles' },
            { id: 'assign_roles', name: 'Assign Roles', module: 'users', description: 'Assign roles to users' }
        ]
    },
    {
        id: 'theaters',
        name: 'Theater Management',
        icon: Building,
        permissions: [
            { id: 'view_theaters', name: 'View Theaters', module: 'theaters', description: 'View all theaters' },
            { id: 'create_theaters', name: 'Create Theaters', module: 'theaters', description: 'Add new theaters' },
            { id: 'edit_theaters', name: 'Edit Theaters', module: 'theaters', description: 'Modify theater details' },
            { id: 'delete_theaters', name: 'Delete Theaters', module: 'theaters', description: 'Remove theaters' },
            { id: 'approve_theaters', name: 'Approve Theaters', module: 'theaters', description: 'Approve pending theaters' }
        ]
    },
    {
        id: 'shows',
        name: 'Show Management',
        icon: Ticket,
        permissions: [
            { id: 'view_shows', name: 'View Shows', module: 'shows', description: 'View all shows and events' },
            { id: 'create_shows', name: 'Create Shows', module: 'shows', description: 'Add new shows' },
            { id: 'edit_shows', name: 'Edit Shows', module: 'shows', description: 'Modify show details' },
            { id: 'delete_shows', name: 'Delete Shows', module: 'shows', description: 'Remove shows' },
            { id: 'manage_bookings', name: 'Manage Bookings', module: 'shows', description: 'View and manage bookings' }
        ]
    },
    {
        id: 'payments',
        name: 'Payment Management',
        icon: DollarSign,
        permissions: [
            { id: 'view_payments', name: 'View Payments', module: 'payments', description: 'View all transactions' },
            { id: 'process_refunds', name: 'Process Refunds', module: 'payments', description: 'Process refund requests' },
            { id: 'view_reports', name: 'View Reports', module: 'payments', description: 'View financial reports' },
            { id: 'manage_wallet', name: 'Manage Wallet', module: 'payments', description: 'Manage system wallet' }
        ]
    },
    {
        id: 'content',
        name: 'Content Management',
        icon: FileText,
        permissions: [
            { id: 'view_content', name: 'View Content', module: 'content', description: 'View all content' },
            { id: 'create_content', name: 'Create Content', module: 'content', description: 'Create blog posts and articles' },
            { id: 'edit_content', name: 'Edit Content', module: 'content', description: 'Modify existing content' },
            { id: 'delete_content', name: 'Delete Content', module: 'content', description: 'Remove content' },
            { id: 'publish_content', name: 'Publish Content', module: 'content', description: 'Publish and unpublish content' }
        ]
    },
    {
        id: 'support',
        name: 'Support & Help',
        icon: MessageCircle,
        permissions: [
            { id: 'view_tickets', name: 'View Tickets', module: 'support', description: 'View support tickets' },
            { id: 'reply_tickets', name: 'Reply to Tickets', module: 'support', description: 'Respond to support tickets' },
            { id: 'resolve_tickets', name: 'Resolve Tickets', module: 'support', description: 'Mark tickets as resolved' },
            { id: 'manage_faq', name: 'Manage FAQ', module: 'support', description: 'Create and edit FAQ entries' }
        ]
    },
    {
        id: 'settings',
        name: 'System Settings',
        icon: Settings,
        permissions: [
            { id: 'view_settings', name: 'View Settings', module: 'settings', description: 'View system settings' },
            { id: 'edit_settings', name: 'Edit Settings', module: 'settings', description: 'Modify system settings' },
            { id: 'manage_backup', name: 'Manage Backup', module: 'settings', description: 'Create and restore backups' },
            { id: 'view_logs', name: 'View Logs', module: 'settings', description: 'View system logs' }
        ]
    }
];

const roleColors = [
    { name: 'Purple', value: 'from-purple-500 to-purple-600', bg: 'bg-purple-100', text: 'text-purple-600' },
    { name: 'Blue', value: 'from-blue-500 to-blue-600', bg: 'bg-blue-100', text: 'text-blue-600' },
    { name: 'Green', value: 'from-green-500 to-green-600', bg: 'bg-green-100', text: 'text-green-600' },
    { name: 'Amber', value: 'from-amber-500 to-amber-600', bg: 'bg-amber-100', text: 'text-amber-600' },
    { name: 'Red', value: 'from-red-500 to-red-600', bg: 'bg-red-100', text: 'text-red-600' },
    { name: 'Pink', value: 'from-pink-500 to-pink-600', bg: 'bg-pink-100', text: 'text-pink-600' },
    { name: 'Indigo', value: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-100', text: 'text-indigo-600' },
    { name: 'Teal', value: 'from-teal-500 to-teal-600', bg: 'bg-teal-100', text: 'text-teal-600' }
];

const roleIcons = [
    { name: 'Shield', icon: Shield, value: 'Shield' },
    { name: 'ShieldCheck', icon: ShieldCheck, value: 'ShieldCheck' },
    { name: 'ShieldAlert', icon: ShieldAlert, value: 'ShieldAlert' },
    { name: 'Crown', icon: Crown, value: 'Crown' },
    { name: 'UserCog', icon: UserCog, value: 'UserCog' },
    { name: 'Eye', icon: Eye, value: 'Eye' },
    { name: 'Users', icon: Users, value: 'Users' },
    { name: 'Star', icon: Star, value: 'Star' }
];

const CreateRole: React.FC<CreateRoleProps> = ({ isOpen, onClose, onCreate }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: 'from-purple-500 to-purple-600',
        icon: 'Shield',
        permissions: [] as string[]
    });
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState({ title: '', message: '', type: 'success' as any });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTogglePermission = (permissionId: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permissionId)
                ? prev.filter(p => p !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSelectAllModule = (modulePermissions: Permission[]) => {
        const modulePermissionIds = modulePermissions.map(p => p.id);
        const allSelected = modulePermissionIds.every(id => selectedPermissions.includes(id));

        if (allSelected) {
            setSelectedPermissions(prev => prev.filter(p => !modulePermissionIds.includes(p)));
        } else {
            setSelectedPermissions(prev => [...new Set([...prev, ...modulePermissionIds])]);
        }
    };

    const handleSelectAll = () => {
        const allPermissions = modules.flatMap(m => m.permissions.map(p => p.id));
        if (selectedPermissions.length === allPermissions.length) {
            setSelectedPermissions([]);
        } else {
            setSelectedPermissions(allPermissions);
        }
    };

    const handleSubmit = () => {
        const roleData = {
            id: Date.now().toString(),
            name: formData.name,
            description: formData.description,
            color: formData.color,
            icon: roleIcons.find(i => i.value === formData.icon)?.icon || Shield,
            permissions: selectedPermissions,
            userCount: 0,
            isSystemRole: false
        };

        onCreate(roleData);
        setPopupMessage({
            title: 'Role Created!',
            message: `${formData.name} role has been created successfully`,
            type: 'success'
        });
        setShowSuccessPopup(true);
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    const handleNext = () => {
        if (step === 1 && (!formData.name.trim() || !formData.description.trim())) {
            alert('Please fill in all required fields');
            return;
        }
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    if (!isOpen) return null;

    const selectedIcon = roleIcons.find(i => i.value === formData.icon)?.icon || Shield;
    const selectedColor = roleColors.find(c => c.value === formData.color) || roleColors[0];
    const allPermissions = modules.flatMap(m => m.permissions);
    const totalPermissions = allPermissions.length;
    const selectedCount = selectedPermissions.length;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <UserPlus className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Create New Role</h2>
                                <p className="text-sm text-gray-500">Step {step} of 2</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Step Indicator */}
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between max-w-md mx-auto">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= 1 ? 'bg-deepTeal text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    1
                                </div>
                                <div className={`w-16 h-1 mx-2 transition-all ${step >= 2 ? 'bg-deepTeal' : 'bg-gray-200'}`}></div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= 2 ? 'bg-deepTeal text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    2
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 ml-4">
                                {step === 1 ? 'Basic Info' : 'Permissions'}
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column - Form */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Content Manager, Support Agent"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="Describe the purpose and responsibilities of this role"
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role Color
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {roleColors.map((color) => (
                                                <button
                                                    key={color.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                                                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${color.value} ${formData.color === color.value ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role Icon
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {roleIcons.map((icon) => {
                                                const Icon = icon.icon;
                                                return (
                                                    <button
                                                        key={icon.value}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, icon: icon.value }))}
                                                        className={`p-2 rounded-lg border transition-all ${formData.icon === icon.value ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-gray-200 hover:border-gray-300'}`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Preview */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4">Role Preview</h3>
                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`p-2 rounded-lg bg-gradient-to-r ${formData.color} text-white`}>
                                                {React.createElement(selectedIcon, { className: "h-5 w-5" })}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{formData.name || 'Role Name'}</h4>
                                                <p className="text-xs text-gray-500">{formData.description || 'Role description will appear here'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Lock className="h-3 w-3" />
                                            <span>Custom Role</span>
                                            <span className="mx-1">•</span>
                                            <span>{selectedPermissions.length} permissions</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <ReusableButton
                                    onClick={handleNext}
                                    label="Continue"
                                    icon="ArrowRight"
                                    className="px-6 py-2"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Permissions */}
                    {step === 2 && (
                        <div className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Select permissions for <span className="font-semibold text-gray-900">{formData.name}</span> role.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {selectedCount} of {totalPermissions} permissions selected
                                    </p>
                                </div>
                                <button
                                    onClick={handleSelectAll}
                                    className="text-sm text-deepTeal hover:underline"
                                >
                                    {selectedCount === totalPermissions ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>

                            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                                {modules.map((module) => {
                                    const ModuleIcon = module.icon;
                                    const modulePermissions = module.permissions;
                                    const selectedModuleCount = modulePermissions.filter(p => selectedPermissions.includes(p.id)).length;
                                    const allModuleSelected = selectedModuleCount === modulePermissions.length;

                                    return (
                                        <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <ModuleIcon className="h-5 w-5 text-deepTeal" />
                                                    <h3 className="font-semibold text-gray-900">{module.name}</h3>
                                                    <span className="text-xs text-gray-500">({selectedModuleCount}/{modulePermissions.length})</span>
                                                </div>
                                                <button
                                                    onClick={() => handleSelectAllModule(modulePermissions)}
                                                    className="text-xs text-deepTeal hover:underline"
                                                >
                                                    {allModuleSelected ? 'Deselect All' : 'Select All'}
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {module.permissions.map((permission) => (
                                                        <label
                                                            key={permission.id}
                                                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedPermissions.includes(permission.id)
                                                                    ? 'border-deepTeal bg-deepTeal/5'
                                                                    : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedPermissions.includes(permission.id)}
                                                                onChange={() => handleTogglePermission(permission.id)}
                                                                className="mt-0.5 rounded border-gray-300 text-deepTeal focus:ring-deepTeal"
                                                            />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                                                                <p className="text-xs text-gray-500">{permission.description}</p>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between gap-3 pt-6 mt-6 border-t border-gray-200">
                                <button
                                    onClick={handleBack}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Back
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <ReusableButton
                                        onClick={handleSubmit}
                                        label="Create Role"
                                        icon="Save"
                                        className="px-6 py-2"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Success Popup */}
            <SuccessPopup
                isOpen={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                type={popupMessage.type}
                title={popupMessage.title}
                message={popupMessage.message}
                duration={3000}
                position="top-right"
            />
        </>
    );
};

export default CreateRole;
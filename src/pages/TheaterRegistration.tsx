import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Mail,
    Phone,
    MapPin,
    FileText,
    Upload,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    Award,
    Calendar,
    Clock,
    DollarSign,
    Shield,
    TrendingUp,
    Zap,
    Eye,
    EyeOff,
    User,
    Briefcase,
    Home,
    Image,
    FileCheck,
    Send,
    Loader2,
    CreditCard,
    Banknote,
    Wallet,
    Landmark,
    Receipt,
    ClipboardCheck,
    UserCheck,
    Globe,
    CalendarDays,
    Ticket,
    Star,
    Users,
    ShieldCheck,
    Coffee,
    Wifi,
    Car,
    Utensils,
    Accessibility,
    Tv,
    Volume2,
    Sofa,
    Wine,
    Cake,
    Baby,
    Gift,
    Sparkles
} from "lucide-react";

// ============================================
// STEP 1: BUSINESS INFORMATION
// ============================================

const BusinessInfoStep = ({ formData, setFormData, errors, handleInputChange }) => {
    const businessTypes = [
        "Sole Proprietorship", "Partnership", "Limited Liability Company (LLC)",
        "Corporation", "Non-Profit Organization", "Government Entity"
    ];

    const yearsOptions = ["Less than 1 year", "1-2 years", "3-5 years", "5-10 years", "10+ years"];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Business Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Legal Business Name */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Legal Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.businessName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="Grand Theater LLC"
                    />
                    <p className="text-xs text-gray-500 mt-1">As it appears on your business license</p>
                    {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
                </div>

                {/* Trade Name / DBA */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Trade Name / DBA <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        name="tradeName"
                        value={formData.tradeName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Grand Theater"
                    />
                    <p className="text-xs text-gray-500 mt-1">If different from legal name (e.g., "Grand Cinema")</p>
                </div>

                {/* Business Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select business type</option>
                        {businessTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.businessType && <p className="text-xs text-red-500 mt-1">{errors.businessType}</p>}
                </div>

                {/* Business License Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Business License Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="businessLicense"
                        value={formData.businessLicense}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.businessLicense ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="BL-2024-12345"
                    />
                    {errors.businessLicense && <p className="text-xs text-red-500 mt-1">{errors.businessLicense}</p>}
                </div>

                {/* Tax ID (TIN) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tax ID / TIN <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.taxId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="123456789"
                    />
                    {errors.taxId && <p className="text-xs text-red-500 mt-1">{errors.taxId}</p>}
                </div>

                {/* Years in Operation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Years in Operation <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="yearsInOperation"
                        value={formData.yearsInOperation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select years</option>
                        {yearsOptions.map(years => (
                            <option key={years} value={years}>{years}</option>
                        ))}
                    </select>
                    {errors.yearsInOperation && <p className="text-xs text-red-500 mt-1">{errors.yearsInOperation}</p>}
                </div>
            </div>

            {/* Business Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Business Description <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="businessDescription"
                    rows={4}
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.businessDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } dark:bg-gray-700 dark:text-white`}
                    placeholder="Describe your theater business, history, mission, and what makes you unique..."
                />
                <p className="text-xs text-gray-500 mt-1">Tell us about your theater, the types of shows you host, and your audience</p>
                {errors.businessDescription && <p className="text-xs text-red-500 mt-1">{errors.businessDescription}</p>}
            </div>
        </div>
    );
};

// ============================================
// STEP 2: CONTACT & OWNER INFORMATION
// ============================================

const ContactInfoStep = ({ formData, setFormData, errors, handleInputChange }) => {
    const positions = ["Owner", "Co-Owner", "General Manager", "Operations Manager", "Director", "Partner", "Other"];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <User className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Owner & Contact Information</h2>
            </div>

            {/* Primary Contact */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-teal-600" />
                    Primary Contact / Owner
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.ownerName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } dark:bg-gray-700 dark:text-white`}
                            placeholder="John Doe"
                        />
                        {errors.ownerName && <p className="text-xs text-red-500 mt-1">{errors.ownerName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Position/Title <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="ownerPosition"
                            value={formData.ownerPosition}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Select position</option>
                            {positions.map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                        {errors.ownerPosition && <p className="text-xs text-red-500 mt-1">{errors.ownerPosition}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="ownerEmail"
                            value={formData.ownerEmail}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.ownerEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } dark:bg-gray-700 dark:text-white`}
                            placeholder="john@example.com"
                        />
                        {errors.ownerEmail && <p className="text-xs text-red-500 mt-1">{errors.ownerEmail}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.ownerPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } dark:bg-gray-700 dark:text-white`}
                            placeholder="+251 911 234 567"
                        />
                        {errors.ownerPhone && <p className="text-xs text-red-500 mt-1">{errors.ownerPhone}</p>}
                    </div>
                </div>
            </div>

            {/* Secondary Contact */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    Secondary Contact <span className="text-xs text-gray-400">(Optional)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="secondaryName"
                            value={formData.secondaryName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Jane Smith"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Position
                        </label>
                        <input
                            type="text"
                            name="secondaryPosition"
                            value={formData.secondaryPosition}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Operations Manager"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="secondaryEmail"
                            value={formData.secondaryEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="jane@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="secondaryPhone"
                            value={formData.secondaryPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="+251 911 234 568"
                        />
                    </div>
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-5 border border-red-200 dark:border-red-800">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Emergency Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contact Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="emergencyName"
                            value={formData.emergencyName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Emergency Contact Name"
                        />
                        {errors.emergencyName && <p className="text-xs text-red-500 mt-1">{errors.emergencyName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="+251 911 234 569"
                        />
                        {errors.emergencyPhone && <p className="text-xs text-red-500 mt-1">{errors.emergencyPhone}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Relationship
                        </label>
                        <input
                            type="text"
                            name="emergencyRelation"
                            value={formData.emergencyRelation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Business Partner / Family Member"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// STEP 3: THEATER DETAILS & FACILITIES
// ============================================

const TheaterDetailsStep = ({ formData, setFormData, errors, handleInputChange, handleCheckboxChange }) => {
    const cities = [
        "Addis Ababa", "Bahir Dar", "Dire Dawa", "Hawassa", "Mekelle",
        "Gondar", "Jimma", "Harar", "Adama", "Dessie", "Arba Minch", "Jijiga"
    ];

    const regions = [
        "Addis Ababa", "Oromia", "Amhara", "Tigray", "Southern Nations",
        "Somali", "Benishangul-Gumuz", "Afar", "Harari", "Gambela", "Sidama"
    ];

    const facilitiesList = [
        { icon: Car, name: "Free Parking", category: "Parking" },
        { icon: Accessibility, name: "Wheelchair Accessible", category: "Accessibility" },
        { icon: Coffee, name: "Concession Stand", category: "Food & Drink" },
        { icon: Wine, name: "Bar/Lounge", category: "Food & Drink" },
        { icon: Utensils, name: "Restaurant", category: "Food & Drink" },
        { icon: Wifi, name: "Free WiFi", category: "Technology" },
        { icon: Tv, name: "Digital Screens", category: "Technology" },
        { icon: Volume2, name: "Dolby Atmos Sound", category: "Audio/Visual" },
        { icon: Sofa, name: "VIP Lounge", category: "Seating" },
        { icon: Star, name: "Premium Seating", category: "Seating" },
        { icon: Baby, name: "Family Friendly", category: "Family" },
        { icon: Cake, name: "Birthday Packages", category: "Events" },
        { icon: Gift, name: "Gift Cards", category: "Services" },
        { icon: Sparkles, name: "Private Events", category: "Services" }
    ];

    const screenTypes = [
        "Standard", "IMAX", "4DX", "Dolby Cinema", "VIP Screen", "3D", "2D", "Drive-in"
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <Home className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Theater Details</h2>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Theater Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="theaterName"
                        value={formData.theaterName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.theaterName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="Grand Theater"
                    />
                    {errors.theaterName && <p className="text-xs text-red-500 mt-1">{errors.theaterName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select city</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Region <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select region</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="123 Bole Road, Addis Ababa"
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
            </div>

            {/* Theater Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Number of Screens <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="totalScreens"
                        value={formData.totalScreens}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.totalScreens ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="3"
                        min="1"
                    />
                    {errors.totalScreens && <p className="text-xs text-red-500 mt-1">{errors.totalScreens}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Total Seating Capacity <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="seatingCapacity"
                        value={formData.seatingCapacity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.seatingCapacity ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                        placeholder="500"
                        min="1"
                    />
                    {errors.seatingCapacity && <p className="text-xs text-red-500 mt-1">{errors.seatingCapacity}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Screen Types Available
                    </label>
                    <select
                        name="screenTypes"
                        multiple
                        value={formData.screenTypes || []}
                        onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            setFormData(prev => ({ ...prev, screenTypes: options }));
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                        size="3"
                    >
                        {screenTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
            </div>

            {/* Facilities & Amenities */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Facilities & Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {facilitiesList.map((facility, idx) => {
                        const Icon = facility.icon;
                        const isChecked = formData.facilities?.includes(facility.name);
                        return (
                            <label
                                key={idx}
                                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${isChecked
                                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    value={facility.name}
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="hidden"
                                />
                                <Icon className={`h-4 w-4 ${isChecked ? 'text-teal-600' : 'text-gray-400'}`} />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{facility.name}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Operating Hours */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Operating Hours
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                        <div key={day} className="flex items-center gap-3">
                            <span className="w-24 text-sm text-gray-600 dark:text-gray-400">{day}</span>
                            <input
                                type="time"
                                name={`hours_${day}_open`}
                                value={formData[`hours_${day}_open`] || ""}
                                onChange={handleInputChange}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                                placeholder="09:00"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                                type="time"
                                name={`hours_${day}_close`}
                                value={formData[`hours_${day}_close`] || ""}
                                onChange={handleInputChange}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                                placeholder="23:00"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ============================================
// STEP 4: SHOW & PERFORMANCE INFORMATION
// ============================================

const ShowInfoStep = ({ formData, setFormData, errors, handleInputChange }) => {
    const [showCount, setShowCount] = useState(formData.shows?.length || 1);

    const addShow = () => {
        setShowCount(prev => prev + 1);
        const newShow = {
            id: Date.now(),
            title: "",
            genre: "",
            duration: "",
            frequency: "Weekly",
            days: [],
            startDate: "",
            endDate: "",
            ticketPrice: "",
            expectedAudience: ""
        };
        setFormData(prev => ({
            ...prev,
            shows: [...(prev.shows || []), newShow]
        }));
    };

    const removeShow = (id) => {
        const updatedShows = formData.shows.filter(show => show.id !== id);
        setFormData(prev => ({ ...prev, shows: updatedShows }));
        setShowCount(updatedShows.length);
    };

    const updateShow = (id, field, value) => {
        const updatedShows = formData.shows.map(show =>
            show.id === id ? { ...show, [field]: value } : show
        );
        setFormData(prev => ({ ...prev, shows: updatedShows }));
    };

    const performanceGenres = [
        "Musical", "Play", "Drama", "Comedy", "Tragedy", "Ballet", "Opera",
        "Concert", "Stand-up Comedy", "Improv", "Children's Theatre", "Experimental"
    ];

    const frequencies = ["Daily", "Weekly", "Bi-Weekly", "Monthly", "Seasonal", "Special Event"];

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-teal-100 rounded-lg">
                        <Ticket className="h-5 w-5 text-teal-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Show & Performance Information</h2>
                </div>
                <button
                    type="button"
                    onClick={addShow}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition flex items-center gap-2"
                >
                    + Add Show
                </button>
            </div>

            {(!formData.shows || formData.shows.length === 0) && (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No shows added yet</p>
                    <p className="text-sm text-gray-400 mt-1">Click "Add Show" to list your upcoming performances</p>
                </div>
            )}

            {formData.shows?.map((show, index) => (
                <div key={show.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 relative">
                    <button
                        type="button"
                        onClick={() => removeShow(show.id)}
                        className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <XCircle className="h-5 w-5 text-red-500" />
                    </button>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Show #{index + 1}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Show Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={show.title}
                                onChange={(e) => updateShow(show.id, "title", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Hamilton, The Lion King, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Genre / Type
                            </label>
                            <select
                                value={show.genre}
                                onChange={(e) => updateShow(show.id, "genre", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select genre</option>
                                {performanceGenres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Duration (minutes)
                            </label>
                            <input
                                type="number"
                                value={show.duration}
                                onChange={(e) => updateShow(show.id, "duration", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                                placeholder="120"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Performance Frequency
                            </label>
                            <select
                                value={show.frequency}
                                onChange={(e) => updateShow(show.id, "frequency", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            >
                                {frequencies.map(freq => (
                                    <option key={freq} value={freq}>{freq}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Performance Days
                            </label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {daysOfWeek.map(day => (
                                    <label key={day} className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            value={day}
                                            checked={show.days?.includes(day)}
                                            onChange={(e) => {
                                                const currentDays = show.days || [];
                                                const newDays = e.target.checked
                                                    ? [...currentDays, day]
                                                    : currentDays.filter(d => d !== day);
                                                updateShow(show.id, "days", newDays);
                                            }}
                                            className="h-4 w-4 text-teal-600 rounded"
                                        />
                                        <span className="text-xs text-gray-600 dark:text-gray-400">{day.slice(0, 3)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={show.startDate}
                                onChange={(e) => updateShow(show.id, "startDate", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={show.endDate}
                                onChange={(e) => updateShow(show.id, "endDate", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Ticket Price (USD/ETB)
                            </label>
                            <input
                                type="text"
                                value={show.ticketPrice}
                                onChange={(e) => updateShow(show.id, "ticketPrice", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                                placeholder="$25 - $75"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Expected Audience Size
                            </label>
                            <input
                                type="text"
                                value={show.expectedAudience}
                                onChange={(e) => updateShow(show.id, "expectedAudience", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                                placeholder="200-300 per show"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ============================================
// STEP 5: DOCUMENT UPLOAD
// ============================================

const DocumentUploadStep = ({ formData, setFormData, errors, handleFileUpload, fileInputRefs }) => {
    const documents = [
        { id: "license", name: "Business License", icon: FileText, required: true, desc: "Valid business license or registration certificate" },
        { id: "taxCertificate", name: "Tax Registration Certificate", icon: Receipt, required: true, desc: "Tax Identification Number (TIN) certificate" },
        { id: "ownerId", name: "Owner ID / Passport", icon: User, required: true, desc: "Clear photo of owner's ID or passport" },
        { id: "theaterPhotos", name: "Theater Photos", icon: Image, required: false, desc: "Interior and exterior photos of your theater" },
        { id: "fireSafety", name: "Fire Safety Certificate", icon: Shield, required: false, desc: "Fire safety inspection certificate" },
        { id: "healthPermit", name: "Health Permit", icon: ShieldCheck, required: false, desc: "If you serve food/drinks" }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <FileCheck className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Required Documents</h2>
            </div>

            <div className="space-y-4">
                {documents.map((doc) => {
                    const Icon = doc.icon;
                    const isUploaded = formData.documents?.[doc.id];
                    const hasError = errors[doc.id];

                    return (
                        <div key={doc.id} className={`border rounded-lg p-4 transition ${hasError ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${isUploaded ? 'bg-green-100' : 'bg-gray-100'} dark:bg-gray-800`}>
                                        <Icon className={`h-5 w-5 ${isUploaded ? 'text-green-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            {doc.name} {doc.required && <span className="text-red-500">*</span>}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">{doc.desc}</p>
                                        {isUploaded && (
                                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                                <CheckCircle className="h-3 w-3" />
                                                Uploaded: {formData.documents[doc.id]?.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <input
                                        ref={el => fileInputRefs.current[doc.id] = el}
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleFileUpload(e, doc.id)}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${isUploaded
                                            ? 'border border-green-500 text-green-600 hover:bg-green-50'
                                            : 'bg-teal-600 text-white hover:bg-teal-700'
                                            }`}
                                    >
                                        <Upload className="h-4 w-4" />
                                        {isUploaded ? 'Replace File' : 'Upload'}
                                    </button>
                                </div>
                            </div>
                            {hasError && <p className="text-xs text-red-500 mt-3">{errors[doc.id]}</p>}
                        </div>
                    );
                })}
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Please ensure all documents are clear and legible. Maximum file size: 10MB per file. Accepted formats: PDF, JPG, PNG.
                </p>
            </div>
        </div>
    );
};

// ============================================
// STEP 6: PRICING PLAN SELECTION
// ============================================

const PricingPlanStep = ({ formData, setFormData, errors, onPlanSelect, selectedPlan, setSelectedPlan }) => {
    const [selectedModel, setSelectedModel] = useState(formData.pricingModel || null);
    const [selectedFrequency, setSelectedFrequency] = useState(formData.payoutFrequency || null);

    const pricingModels = [
        {
            id: "commission",
            name: "Commission Only",
            description: "Pay only when you sell tickets",
            icon: DollarSign,
            rate: "5-10% per ticket",
            bestFor: "New / Low Volume Theaters"
        },
        {
            id: "rent",
            name: "Fixed Rent",
            description: "Fixed monthly fee, zero commission",
            icon: Building2,
            rate: "$500 - $2,000/month",
            bestFor: "High Volume / Established Theaters"
        },
        {
            id: "hybrid",
            name: "Hybrid Model",
            description: "Lower rent + reduced commission",
            icon: TrendingUp,
            rate: "$200-$1,000/month + 2-5% commission",
            bestFor: "Medium Volume / Growing Theaters"
        }
    ];

    const payoutFrequencies = [
        { id: "weekly", name: "Weekly", icon: Calendar, payout: "Every Monday", commission: "8%", holdback: "5% / 30 days" },
        { id: "biweekly", name: "Bi-Weekly", icon: CalendarDays, payout: "1st & 15th", commission: "7.5%", holdback: "6% / 35 days" },
        { id: "monthly", name: "Monthly", icon: Clock, payout: "5th of month", commission: "7%", holdback: "7% / 40 days" },
        { id: "quarterly", name: "Quarterly", icon: Award, payout: "Jan/Apr/Jul/Oct", commission: "6%", holdback: "8% / 45 days" },
        { id: "yearly", name: "Yearly", icon: Star, payout: "January 15th", commission: "5%", holdback: "10% / 60 days" }
    ];

    const expeditedOptions = {
        weekly: { name: "2-Day Expedited", fee: "+1.5%", payout: "Within 2 days after holdback" },
        monthly: { name: "Mid-Month", fee: "+2%", payout: "20th of month" },
        quarterly: { name: "Monthly", fee: "+1.5%", payout: "Monthly payouts" },
        yearly: { name: "Semi-Annual", fee: "+0.5%", payout: "Every 6 months" }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <Wallet className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pricing & Payout Plan</h2>
            </div>

            {/* Pricing Models */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Pricing Model <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pricingModels.map((model) => {
                        const Icon = model.icon;
                        const isSelected = selectedModel === model.id;
                        return (
                            <div
                                key={model.id}
                                className={`cursor-pointer rounded-xl border-2 p-4 transition ${isSelected ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 hover:border-teal-300'}`}
                                onClick={() => {
                                    setSelectedModel(model.id);
                                    setFormData(prev => ({ ...prev, pricingModel: model.id }));
                                }}
                            >
                                <Icon className={`h-6 w-6 mb-3 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />
                                <h3 className="font-bold text-gray-900 dark:text-white">{model.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{model.description}</p>
                                <p className="text-xs font-medium text-teal-600 mt-2">{model.rate}</p>
                                <p className="text-xs text-gray-400 mt-1">Best for: {model.bestFor}</p>
                            </div>
                        );
                    })}
                </div>
                {errors.pricingModel && <p className="text-xs text-red-500 mt-2">{errors.pricingModel}</p>}
            </div>

            {/* Payout Frequency */}
            {selectedModel && (
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Select Payout Frequency <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {payoutFrequencies.map((freq) => {
                            const Icon = freq.icon;
                            const isSelected = selectedFrequency === freq.id;
                            return (
                                <div
                                    key={freq.id}
                                    className={`cursor-pointer rounded-lg border p-3 transition ${isSelected ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 hover:border-teal-300'}`}
                                    onClick={() => {
                                        setSelectedFrequency(freq.id);
                                        setFormData(prev => ({ ...prev, payoutFrequency: freq.id }));
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className={`h-4 w-4 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />
                                        <span className="font-medium text-gray-900 dark:text-white">{freq.name}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Payout: {freq.payout}</p>
                                    <p className="text-xs text-gray-500">Commission: {freq.commission}</p>
                                    <p className="text-xs text-gray-400">Holdback: {freq.holdback}</p>
                                </div>
                            );
                        })}
                    </div>
                    {errors.payoutFrequency && <p className="text-xs text-red-500 mt-2">{errors.payoutFrequency}</p>}
                </div>
            )}

            {/* Expedited Options */}
            {selectedFrequency && expeditedOptions[selectedFrequency] && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                Expedited Payout
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Get paid faster with expedited processing
                            </p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.expeditedEnabled}
                                onChange={(e) => setFormData(prev => ({ ...prev, expeditedEnabled: e.target.checked }))}
                                className="h-4 w-4 text-teal-600 rounded"
                            />
                            <span className="text-sm font-medium text-teal-600">Enable</span>
                        </label>
                    </div>

                    {formData.expeditedEnabled && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm">
                                <span className="font-medium">{expeditedOptions[selectedFrequency].name}</span>
                                <span className="text-gray-500 ml-2">Fee: {expeditedOptions[selectedFrequency].fee}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Payout: {expeditedOptions[selectedFrequency].payout}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Commission Rates Table */}
            {selectedModel && (
                <div className="mt-6 overflow-x-auto">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Commission Rates by Ticket Type</h4>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="p-3 text-left">Ticket Type</th>
                                <th className="p-3 text-left">Commission Rate</th>
                                <th className="p-3 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { type: "Standard Tickets", rate: selectedFrequency === "weekly" ? "8%" : selectedFrequency === "monthly" ? "7%" : "6%", desc: "Regular seating" },
                                { type: "VIP/Premium", rate: selectedFrequency === "weekly" ? "10%" : selectedFrequency === "monthly" ? "9%" : "8%", desc: "Premium sections" },
                                { type: "Group Bookings (10+)", rate: selectedFrequency === "weekly" ? "6%" : selectedFrequency === "monthly" ? "5%" : "4%", desc: "Groups of 10 or more" },
                                { type: "Early Bird", rate: selectedFrequency === "weekly" ? "5%" : selectedFrequency === "monthly" ? "4%" : "3%", desc: "7+ days in advance" }
                            ].map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{item.type}</td>
                                    <td className="p-3 font-medium text-teal-600">{item.rate}</td>
                                    <td className="p-3 text-gray-500">{item.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Monthly Rent Options (if rent model selected) */}
            {selectedModel === "rent" && (
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Select Rent Plan <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { name: "Monthly", fee: "$800/month", savings: "0%", bestFor: "Standard" },
                            { name: "Quarterly", fee: "$2,100/quarter", savings: "12.5%", bestFor: "Better value" },
                            { name: "Yearly", fee: "$7,200/year", savings: "25% (2 months free)", bestFor: "Best value" }
                        ].map((plan, idx) => (
                            <div
                                key={idx}
                                className={`cursor-pointer rounded-lg border p-4 transition ${formData.rentPlan === plan.name ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 hover:border-teal-300'}`}
                                onClick={() => setFormData(prev => ({ ...prev, rentPlan: plan.name }))}
                            >
                                <h4 className="font-bold text-gray-900 dark:text-white">{plan.name}</h4>
                                <p className="text-xl font-bold text-teal-600 mt-2">{plan.fee}</p>
                                <p className="text-xs text-green-600 mt-1">Save {plan.savings}</p>
                                <p className="text-xs text-gray-500 mt-2">Best for: {plan.bestFor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================
// STEP 7: TERMS & AGREEMENT
// ============================================

const TermsStep = ({ agreedToTerms, setAgreedToTerms, formData, errors }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                    <ClipboardCheck className="h-5 w-5 text-teal-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Terms & Agreement</h2>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-lg">Theater Owner Agreement</h3>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>By submitting this registration, you agree to the following terms:</p>

                    <ul className="list-disc pl-5 space-y-2">
                        <li>All information provided is accurate and complete</li>
                        <li>You will comply with all local laws and regulations</li>
                        <li>Commission rates will apply as per selected pricing plan</li>
                        <li>Holdback policy applies for refunds and chargebacks</li>
                        <li>TheaterHUB reserves the right to verify submitted documents</li>
                        <li>You are authorized to represent the business</li>
                        <li>You agree to the payout terms selected</li>
                        <li>You will maintain accurate show schedules and pricing</li>
                        <li>You will honor all ticket sales processed through TheaterHUB</li>
                    </ul>

                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <p className="text-amber-800 dark:text-amber-300 text-xs">
                            <strong>Important:</strong> Your registration will be reviewed by our team within 2-3 business days.
                            You will receive email confirmation once approved. Until approval, you will not be able to list shows or sell tickets.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            I confirm that all information provided is accurate and complete
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            I understand that providing false information may result in rejection or termination
                        </p>
                    </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.acceptMarketing}
                        onChange={(e) => setFormData(prev => ({ ...prev, acceptMarketing: e.target.checked }))}
                        className="mt-1"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            I agree to receive marketing communications from TheaterHUB
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            You can unsubscribe at any time
                        </p>
                    </div>
                </label>
            </div>

            {errors.terms && <p className="text-xs text-red-500 mt-2">{errors.terms}</p>}
        </div>
    );
};

// ============================================
// MAIN REGISTRATION COMPONENT
// ============================================

const TheaterRegistration = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRefs = useRef({});

    const [formData, setFormData] = useState({
        // Business Information
        businessName: "",
        tradeName: "",
        businessType: "",
        businessLicense: "",
        taxId: "",
        yearsInOperation: "",
        businessDescription: "",

        // Contact Information
        ownerName: "",
        ownerPosition: "",
        ownerEmail: "",
        ownerPhone: "",
        secondaryName: "",
        secondaryPosition: "",
        secondaryEmail: "",
        secondaryPhone: "",
        emergencyName: "",
        emergencyPhone: "",
        emergencyRelation: "",

        // Theater Details
        theaterName: "",
        city: "",
        region: "",
        address: "",
        totalScreens: "",
        seatingCapacity: "",
        screenTypes: [],
        facilities: [],
        hours: {},

        // Show Information
        shows: [],

        // Documents
        documents: {},

        // Pricing Plan
        pricingModel: "",
        payoutFrequency: "",
        expeditedEnabled: false,
        rentPlan: "",

        // Marketing
        acceptMarketing: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData(prev => ({
                ...prev,
                facilities: [...(prev.facilities || []), value]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                facilities: (prev.facilities || []).filter(f => f !== value)
            }));
        }
    };

    const handleFileUpload = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, [docType]: "File size must be less than 10MB" }));
                return;
            }
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, [docType]: "Only JPEG, PNG, or PDF files are allowed" }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                documents: { ...prev.documents, [docType]: file }
            }));
            setErrors(prev => ({ ...prev, [docType]: null }));
        }
    };

    const validateStep = () => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
            if (!formData.businessType) newErrors.businessType = "Business type is required";
            if (!formData.businessLicense.trim()) newErrors.businessLicense = "Business license is required";
            if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required";
            if (!formData.yearsInOperation) newErrors.yearsInOperation = "Years in operation is required";
            if (!formData.businessDescription.trim()) newErrors.businessDescription = "Business description is required";
        } else if (step === 2) {
            if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
            if (!formData.ownerPosition) newErrors.ownerPosition = "Position is required";
            if (!formData.ownerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.ownerEmail = "Valid email is required";
            if (!formData.ownerPhone.trim()) newErrors.ownerPhone = "Phone number is required";
            if (!formData.emergencyName.trim()) newErrors.emergencyName = "Emergency contact name is required";
            if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required";
        } else if (step === 3) {
            if (!formData.theaterName.trim()) newErrors.theaterName = "Theater name is required";
            if (!formData.city) newErrors.city = "City is required";
            if (!formData.region) newErrors.region = "Region is required";
            if (!formData.address.trim()) newErrors.address = "Address is required";
            if (!formData.totalScreens || formData.totalScreens < 1) newErrors.totalScreens = "Valid number of screens is required";
            if (!formData.seatingCapacity || formData.seatingCapacity < 1) newErrors.seatingCapacity = "Valid seating capacity is required";
        } else if (step === 4) {
            if (!formData.shows || formData.shows.length === 0) {
                newErrors.shows = "At least one show is required";
            } else {
                formData.shows.forEach((show, idx) => {
                    if (!show.title) newErrors[`show_${idx}_title`] = "Show title is required";
                });
            }
        } else if (step === 5) {
            if (!formData.documents.license) newErrors.license = "Business license is required";
            if (!formData.documents.taxCertificate) newErrors.taxCertificate = "Tax certificate is required";
            if (!formData.documents.ownerId) newErrors.ownerId = "Owner ID is required";
        } else if (step === 6) {
            if (!formData.pricingModel) newErrors.pricingModel = "Please select a pricing model";
            if (!formData.payoutFrequency) newErrors.payoutFrequency = "Please select payout frequency";
        } else if (step === 7) {
            if (!agreedToTerms) newErrors.terms = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Registration Data:", formData);

        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    const steps = [
        { number: 1, title: "Business Info", component: BusinessInfoStep },
        { number: 2, title: "Contact Info", component: ContactInfoStep },
        { number: 3, title: "Theater Details", component: TheaterDetailsStep },
        { number: 4, title: "Show Info", component: ShowInfoStep },
        { number: 5, title: "Documents", component: DocumentUploadStep },
        { number: 6, title: "Pricing Plan", component: PricingPlanStep },
        { number: 7, title: "Terms", component: TermsStep }
    ];

    const CurrentStepComponent = steps[step - 1].component;

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
                >
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Registration Submitted!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Thank you for registering with TheaterHUB. Your application is being reviewed by our team. You'll receive an email within 2-3 business days.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Application ID</p>
                        <p className="text-lg font-mono font-bold text-teal-600">TH-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                    </div>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition"
                    >
                        Go to Homepage
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-teal-100 rounded-2xl mb-4">
                        <Building2 className="h-8 w-8 text-teal-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Theater Owner Registration
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Join TheaterHUB and reach thousands of theater lovers
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {steps.map((s, idx) => (
                            <div key={s.number} className="flex-1 relative">
                                <div className={`flex items-center ${idx !== steps.length - 1 ? 'flex-1' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all z-10 bg-white dark:bg-gray-800 ${s.number < step ? 'border-teal-600 bg-teal-600 text-white' :
                                        s.number === step ? 'border-teal-600 text-teal-600' :
                                            'border-gray-300 text-gray-400'
                                        }`}>
                                        {s.number < step ? <CheckCircle className="h-4 w-4" /> : s.number}
                                    </div>
                                    {idx !== steps.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 ${s.number < step ? 'bg-teal-600' : 'bg-gray-300'
                                            }`} />
                                    )}
                                </div>
                                <p className={`text-xs mt-2 text-center ${s.number === step ? 'text-teal-600 font-medium' : 'text-gray-500'}`}>
                                    {s.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
                    >
                        <CurrentStepComponent
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            handleCheckboxChange={handleCheckboxChange}
                            handleFileUpload={handleFileUpload}
                            fileInputRefs={fileInputRefs}
                            agreedToTerms={agreedToTerms}
                            setAgreedToTerms={setAgreedToTerms}
                        />

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            {step > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </button>
                            )}

                            {step < 7 ? (
                                <button
                                    onClick={handleNext}
                                    className="ml-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition flex items-center gap-2"
                                >
                                    Continue
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !agreedToTerms}
                                    className={`ml-auto px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2 ${isSubmitting || !agreedToTerms
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Registration
                                            <Send className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Help Text */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    By submitting this application, you agree to our <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default TheaterRegistration;
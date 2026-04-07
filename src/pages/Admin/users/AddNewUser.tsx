// src/components/Users/AddUser.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Eye, EyeOff, UserPlus } from 'lucide-react';
import * as Yup from 'yup';
import ReusableForm from '../../../components/Reusable/ReusableForm';
import ButtonStyle from '../../../components/Reusable/ButtonStyle';
import Colors from '../../../components/Reusable/Colors';

// Types
interface AddUserProps {
  onSubmit: (values: any) => void;
  onClose: () => void;
  initialValues?: any;
  formTitle?: string;
}

// Validation Schema
const ValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]{10,15}$/, 'Please enter a valid phone number'),
  role: Yup.string()
    .required('Role is required'),
  status: Yup.string()
    .required('Status is required'),
  department: Yup.string(),
});

// Reusable Button Component
const ReusableButton: React.FC<{
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}> = ({ onClick, type = 'button', children, variant = 'primary', className = '', disabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getButtonStyle = () => {
    if (variant === 'secondary') {
      return {
        backgroundColor: isHovered ? Colors.lightGray : Colors.white,
        color: Colors.error,
        transition: 'all 0.3s ease',
        border: `2px solid ${Colors.error}`,
      };
    }
    if (variant === 'danger') {
      return {
        backgroundColor: isHovered ? Colors.error : Colors.red,
        color: Colors.white,
        transition: 'all 0.3s ease',
        border: 'none',
      };
    }
    return {
      backgroundColor: isHovered ? ButtonStyle.hoverBackgroundColor : ButtonStyle.backgroundColor,
      color: ButtonStyle.color,
      transition: 'all 0.3s ease',
      border: 'none',
    };
  };

  const buttonStyle = getButtonStyle();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${ButtonStyle.base} ${className}`}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

const AddUser: React.FC<AddUserProps> = ({
  onSubmit,
  onClose,
  initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
    status: 'Active',
    department: '',
  },
  formTitle = 'Add New User'
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const formFields = [
    {
      name: 'username',
      type: 'text' as const,
      label: 'Username',
      placeholder: 'Enter username',
    },
    {
      name: 'email',
      type: 'email' as const,
      label: 'Email Address',
      placeholder: 'Enter email address',
    },
    {
      name: 'phone',
      type: 'text' as const,
      label: 'Phone Number',
      placeholder: 'Enter phone number',
    },
    {
      name: 'password',
      type: showPassword ? 'text' : 'password',
      label: 'Password',
      placeholder: 'Enter password',
      icon: showPassword ? <EyeOff size={18} /> : <Eye size={18} />,
      onIconClick: togglePasswordVisibility,
    },
    {
      name: 'confirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      icon: showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />,
      onIconClick: toggleConfirmPasswordVisibility,
    },
    {
      name: 'role',
      type: 'select' as const,
      label: 'Role',
      placeholder: 'Select role',
      options: [

        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'theater_owner', label: 'Theater Owner' },
        { value: 'salesperson', label: 'Salesperson' },
        { value: 'scanner', label: 'Scanner' },
        { value: 'customer', label: 'Customer' },
      ],
    },
    {
      name: 'status',
      type: 'select' as const,
      label: 'Status',
      placeholder: 'Select status',
      options: [
        { value: '', label: 'Select status' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Pending', label: 'Pending' },
      ],
    },
    {
      name: 'department',
      type: 'text' as const,
      label: 'Department (Optional)',
      placeholder: 'Enter department name',
    },
  ];

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    // Remove confirmPassword from submission data
    const { confirmPassword, ...submitData } = values;
    await onSubmit(submitData);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserPlus className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{formTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <ReusableForm
            id="add-user-form"
            fields={formFields}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            render={(formik) => (
              <div className="flex gap-3 pt-4">
                <ReusableButton
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    formik.resetForm();
                    onClose();
                  }}
                  className="flex-1"
                >
                  Cancel
                </ReusableButton>
                <ReusableButton
                  type="submit"
                  variant="primary"
                  disabled={formik.isSubmitting}
                  className="flex-1"
                >
                  {formik.isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Submit User
                    </>
                  )}
                </ReusableButton>
              </div>
            )}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AddUser;
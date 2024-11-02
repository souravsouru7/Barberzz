import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addShop } from '../../redux/slices/shopSlice';
import { Store, Image, Phone, FileText, Upload, AlertCircle } from 'lucide-react';

const AddShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(state => state.shop);

  const [shopData, setShopData] = useState({
    shopName: '',
    address: '',
    contactNumber: '',
    description: '',
    shopImage: null,
    licenseImage: null,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const shopkeeper = JSON.parse(localStorage.getItem('shopkeeper'));
    const token = localStorage.getItem('token');

    if (!shopkeeper || !token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success, navigate]);

  const validate = () => {
    let errors = {};
    if (!shopData.shopName) errors.shopName = 'Shop name is required';
    if (!shopData.address) errors.address = 'Address is required';
    if (!shopData.contactNumber || !/^\d{10}$/.test(shopData.contactNumber)) {
      errors.contactNumber = 'Valid contact number is required (10 digits)';
    }
    if (!shopData.description) errors.description = 'Description is required';
    if (!shopData.shopImage) errors.shopImage = 'Shop image is required';
    if (!shopData.licenseImage) errors.licenseImage = 'License image is required';
    return errors;
  };

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setFormErrors({});
    
    try {
      await dispatch(addShop(shopData)).unwrap();
    } catch (err) {
      console.error('Failed to add shop:', err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100">
      <header className="flex justify-between items-center bg-white p-4 rounded-xl mb-6">
        <div className="flex items-center">
          <Store size={28} className="text-indigo-600 mr-2" />
          <div className="text-2xl text-gray-800 font-bold">Add New Shop</div>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center">
              <AlertCircle size={20} className="text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<Store size={20} />}
            label="Shop Name"
            name="shopName"
            value={shopData.shopName}
            onChange={handleChange}
            error={formErrors.shopName}
          />

          <InputField
            icon={<FileText size={20} />}
            label="Address"
            name="address"
            value={shopData.address}
            onChange={handleChange}
            error={formErrors.address}
          />

          <InputField
            icon={<Phone size={20} />}
            label="Contact Number"
            name="contactNumber"
            value={shopData.contactNumber}
            onChange={handleChange}
            error={formErrors.contactNumber}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center mb-1">
                <FileText size={20} className="text-gray-500 mr-2" />
                Description
              </div>
            </label>
            <textarea
              name="description"
              value={shopData.description}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[100px]"
            ></textarea>
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
            )}
          </div>

          <FileUpload
            icon={<Image size={20} />}
            label="Shop Image"
            name="shopImage"
            onChange={handleFileChange}
            error={formErrors.shopImage}
          />

          <FileUpload
            icon={<FileText size={20} />}
            label="License Image"
            name="licenseImage"
            onChange={handleFileChange}
            error={formErrors.licenseImage}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding Shop...' : 'Add Shop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, name, value, onChange, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      <div className="flex items-center mb-1">
        <span className="text-gray-500 mr-2">{icon}</span>
        {label}
      </div>
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    />
    {error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
);

const FileUpload = ({ icon, label, name, onChange, error }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      <div className="flex items-center mb-1">
        <span className="text-gray-500 mr-2">{icon}</span>
        {label}
      </div>
    </label>
    <div className="mt-1">
      <label className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-300">
        <div className="space-y-1 text-center">
          <Upload size={24} className="mx-auto text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <span className="relative font-medium text-indigo-600 hover:text-indigo-500">
              Click to upload
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
        <input
          type="file"
          name={name}
          onChange={onChange}
          className="sr-only"
        />
      </label>
    </div>
   
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

export default AddShop;
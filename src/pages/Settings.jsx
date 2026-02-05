import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { User, Mail, Lock, Bell, Shield, CreditCard } from "lucide-react";
import { isValidEmail, validatePassword } from "../utils/validators";
import toast from "react-hot-toast";

/**
 * Settings Page Component
 */
const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: ""
  });
  const [profileErrors, setProfileErrors] = useState({});

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailMarketing: false,
    emailUpdates: true,
    pushOrders: true,
    pushMessages: false
  });

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "billing", name: "Billing", icon: CreditCard }
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!profileData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!profileData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(profileData.email)) {
      errors.email = "Invalid email format";
    }

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    updateUser(profileData);
    toast.success("Profile updated successfully");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    const passwordValidation = validatePassword(passwordData.newPassword);
    if (!passwordValidation.isValid) {
      errors.newPassword = passwordValidation.message;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    // Mock password update
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    toast.success("Password updated successfully");
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success("Notification settings updated");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card padding={false}>
            <nav className="space-y-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <tab.icon size={20} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card
              title="Profile Information"
              subtitle="Update your personal details"
            >
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="flex items-center gap-6">
                  <img
                    src={
                      user?.avatar ||
                      "https://ui-avatars.com/api/?name=Admin&background=0ea5e9&color=fff"
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, GIF or PNG. Max size of 2MB
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    error={profileErrors.name}
                    icon={<User size={18} className="text-gray-400" />}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    error={profileErrors.email}
                    icon={<Mail size={18} className="text-gray-400" />}
                    required
                  />
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="+1 (555) 000-0000"
                />

                <div className="flex justify-end">
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card
                title="Change Password"
                subtitle="Update your password to keep your account secure"
              >
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <Input
                    label="Current Password"
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    error={passwordErrors.currentPassword}
                    icon={<Lock size={18} className="text-gray-400" />}
                    required
                  />

                  <Input
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    error={passwordErrors.newPassword}
                    icon={<Lock size={18} className="text-gray-400" />}
                    helperText="Must be at least 8 characters with uppercase, lowercase, and number"
                    required
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    error={passwordErrors.confirmPassword}
                    icon={<Lock size={18} className="text-gray-400" />}
                    required
                  />

                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Update Password
                    </Button>
                  </div>
                </form>
              </Card>

              <Card
                title="Two-Factor Authentication"
                subtitle="Add an extra layer of security"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Enable 2FA
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Secure your account with two-factor authentication
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <Card
              title="Notification Preferences"
              subtitle="Manage how you receive notifications"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Email Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Order Updates
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive emails about order status
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailOrders}
                          onChange={() =>
                            handleNotificationToggle("emailOrders")
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Marketing Emails
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive promotional emails
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailMarketing}
                          onChange={() =>
                            handleNotificationToggle("emailMarketing")
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Platform Updates
                        </p>
                        <p className="text-sm text-gray-500">
                          News and feature announcements
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailUpdates}
                          onChange={() =>
                            handleNotificationToggle("emailUpdates")
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Push Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          New Orders
                        </p>
                        <p className="text-sm text-gray-500">
                          Get notified of new orders
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushOrders}
                          onChange={() =>
                            handleNotificationToggle("pushOrders")
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Messages
                        </p>
                        <p className="text-sm text-gray-500">
                          Customer messages and inquiries
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushMessages}
                          onChange={() =>
                            handleNotificationToggle("pushMessages")
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <Card
                title="Subscription Plan"
                subtitle="Manage your billing and subscription"
              >
                <Alert
                  type="info"
                  message="You are currently on the Professional Plan"
                  dismissible={false}
                />
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      $49.99 / month
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Next billing date: March 2, 2026
                    </p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
              </Card>

              <Card
                title="Payment Method"
                subtitle="Manage your payment information"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-gray-500">Expires 12/2026</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Payment Method
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

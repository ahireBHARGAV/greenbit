import React, { useState, useEffect, useMemo } from 'react';
import {
    Leaf,
    LayoutDashboard,
    Users,
    Zap,
    Car,
    Train,
    Bike,
    Bus,
    Clock,
    Settings,
    Navigation,
    Cloud,
    HardDrive,
    X,
    MapPin,
    CheckCircle,
    ArrowRight,
    Bell,
    TrendingDown,
    Info
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// --- 1. CONSTANTS & FACTORS ---

const COMMUTE_MODES = [
    { id: 'car', label: 'Car (Petrol)', factor: 0.19, icon: Car, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'ev', label: 'Car (EV)', factor: 0.07, icon: Car, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'metro', label: 'Metro', factor: 0.04, icon: Train, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'bus', label: 'Bus', factor: 0.08, icon: Bus, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'auto', label: 'Auto-rickshaw', factor: 0.12, icon: Car, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'bike', label: 'Bike/Walk', factor: 0.0, icon: Bike, color: 'text-sky-500', bg: 'bg-sky-50' }
];

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR'];

// Scope 3 Factors (Adjusted for Indian context)
const FACTORS = {
    cloudCpu: 0.025, // kg CO2e per vCPU hour (higher due to India's grid intensity)
    cloudStorage: 0.006, // kg CO2e per GB/month
    serverEmbodied: 85, // kg CO2e amortized monthly per server unit
};

// --- 2. MOCK DATA GENERATOR ---

const INDIAN_NAMES = [
    "Aarav Patel", "Vihaan Sharma", "Aditya Verma", "Sai Kumar", "Arjun Reddy",
    "Reyansh Singh", "Muhammad Khan", "Ishaan Gupta", "Krishna Iyer", "Dhruv Malhotra",
    "Ananya Das", "Diya Rao", "Saanvi Nair", "Aadhya Joshi", "Kiara Shah",
    "Pari Mehta", "Myra Kapoor", "Riya Jain", "Anika Choudhury", "Navya Agarwal",
    "Kabir Chatterjee", "Vivaan Saxena", "Ayaan Bhat", "Vihaan Mishra", "Advik Deshmukh"
];

const generateInitialData = () => {
    return Array.from({ length: 25 }, (_, i) => {
        const dept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
        const mode = COMMUTE_MODES[Math.floor(Math.random() * COMMUTE_MODES.length)];
        const distance = Math.floor(Math.random() * 30) + 5;
        const hours = Math.floor(Math.random() * 4) + 4; // 4-8 hours
        const name = INDIAN_NAMES[i % INDIAN_NAMES.length];

        return {
            id: i + 1,
            name: name,
            dept,
            commute: { mode: mode.id, distance },
            hoursLogged: hours,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    });
};

// --- 3. PAGE: LANDING (ROUTER) ---

const LandingPage = ({ onNavigate }) => (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="text-center mb-16 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-2xl mb-6 shadow-2xl border border-slate-800 ring-1 ring-slate-700">
                <Leaf className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight">Green<span className="text-emerald-400">Bit</span></h1>
            <p className="text-slate-400 text-xl max-w-lg mx-auto leading-relaxed">
                The granular, bottom-up emission tracking system for the modern enterprise.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10 px-4">
            {/* Employee Route */}
            <button
                onClick={() => onNavigate('employee')}
                className="group relative bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-10 rounded-3xl text-left transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-emerald-900/20 hover:-translate-y-1"
            >
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-colors">
                    <Users className="w-7 h-7 text-slate-300 group-hover:text-slate-900" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Employee Portal</h2>
                <p className="text-slate-400 text-lg">Log your commute, clock in hours, and track your personal impact.</p>
            </button>

            {/* Admin Route */}
            <button
                onClick={() => onNavigate('admin')}
                className="group relative bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-10 rounded-3xl text-left transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-indigo-900/20 hover:-translate-y-1"
            >
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowRight className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <LayoutDashboard className="w-7 h-7 text-slate-300 group-hover:text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Admin Dashboard</h2>
                <p className="text-slate-400 text-lg">Analyze company-wide data, manage utility inputs, and view allocation logic.</p>
            </button>
        </div>
    </div>
);

// --- 4. PAGE: EMPLOYEE PORTAL ---

const EmployeePage = ({ onLogData, onNavigate }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        mode: 'metro',
        distance: 12.5,
        hours: 8,
        locationType: 'home', // 'home' or 'custom'
        customAddress: ''
    });
    const [isCalculating, setIsCalculating] = useState(false);
    const [sessionImpact, setSessionImpact] = useState(0); // Stores the result for success screen

    // Mock Addresses (Indian locations)
    const HOME_ADDRESS = "Flat 4B, Prestige Apartments, Koramangala";
    const OFFICE_ADDRESS = "GreenBit HQ, Manyata Tech Park, Bengaluru";

    const handleLocationChange = (type) => {
        setFormData(prev => ({ ...prev, locationType: type }));

        if (type === 'home') {
            setIsCalculating(true);
            setTimeout(() => {
                setFormData(prev => ({ ...prev, locationType: 'home', distance: 12.5 }));
                setIsCalculating(false);
            }, 600);
        } else {
            setFormData(prev => ({ ...prev, distance: 0, customAddress: '' }));
        }
    };

    const handleCustomAddressBlur = () => {
        if (formData.customAddress.length > 3) {
            setIsCalculating(true);
            setTimeout(() => {
                const mockDist = Math.floor(Math.random() * 20) + 15;
                setFormData(prev => ({ ...prev, distance: mockDist }));
                setIsCalculating(false);
            }, 1500);
        }
    };

    const handleSubmit = () => {
        // Calculate estimated impact immediately for the user (Scope 3 part only as Rate is admin side)
        const factor = COMMUTE_MODES.find(m => m.id === formData.mode)?.factor || 0;
        const impact = (formData.distance * 2 * factor).toFixed(2);
        setSessionImpact(impact);

        onLogData(formData);
        setStep(4);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('landing')}>
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                        <Leaf className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Green<span className="text-emerald-600">Bit</span> <span className="text-slate-400 font-normal text-sm">| Personal</span></span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block leading-tight">
                        <div className="text-sm font-bold text-slate-900">Arjun Reddy</div>
                        <div className="text-xs text-slate-500 font-medium">Engineering</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-slate-600 font-bold border border-white shadow-sm">AR</div>
                </div>
            </nav>

            <div className="max-w-xl mx-auto mt-8 p-6 pb-20">

                {/* STEP 1: MODE */}
                {step === 1 && (
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Commute Mode</h2>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Step 1 of 3</span>
                            </div>
                            <p className="text-slate-500 mb-8 text-lg">How did you get to the office today?</p>

                            <div className="grid grid-cols-2 gap-4">
                                {COMMUTE_MODES.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => {
                                            setFormData({ ...formData, mode: m.id });
                                            setStep(2);
                                        }}
                                        className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3 group relative overflow-hidden ${formData.mode === m.id
                                            ? `border-emerald-500 bg-emerald-50/50 text-emerald-900 ring-2 ring-emerald-500 ring-offset-2`
                                            : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-500'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full ${m.bg} ${m.color} transition-transform group-hover:scale-110`}>
                                            <m.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-semibold">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2: ADDRESS / DISTANCE */}
                {step === 2 && (
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in slide-in-from-right-8 duration-500">
                        <div className="p-8">
                            <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-slate-800 mb-6 flex items-center gap-1 font-medium transition-colors">
                                ← Back
                            </button>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-2xl font-bold text-slate-900">Your Journey</h2>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Step 2 of 3</span>
                            </div>
                            <p className="text-slate-500 mb-8 text-lg">Where did you start from?</p>

                            <div className="space-y-4 mb-8">
                                {/* Home Option */}
                                <div
                                    onClick={() => handleLocationChange('home')}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${formData.locationType === 'home'
                                        ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${formData.locationType === 'home' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-900">Home Address</div>
                                        <div className="text-sm text-slate-500">{HOME_ADDRESS}</div>
                                    </div>
                                    {formData.locationType === 'home' && <CheckCircle className="w-6 h-6 text-emerald-500 fill-emerald-50" />}
                                </div>

                                {/* Custom Option */}
                                <div
                                    onClick={() => handleLocationChange('custom')}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${formData.locationType === 'custom'
                                        ? 'border-emerald-500 ring-1 ring-emerald-500'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${formData.locationType === 'custom' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <Navigation className="w-6 h-6" />
                                        </div>
                                        <div className="font-bold text-slate-900">Custom Location</div>
                                    </div>

                                    {formData.locationType === 'custom' && (
                                        <div className="pl-16 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Enter starting address..."
                                                value={formData.customAddress}
                                                onChange={(e) => setFormData({ ...formData, customAddress: e.target.value })}
                                                onBlur={handleCustomAddressBlur}
                                                className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                                            />
                                            <p className="text-xs text-slate-400 mt-2">Click outside to auto-calculate route.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Map/Distance Preview */}
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                                <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                                    <span className="font-medium">Calculated Distance (One Way)</span>
                                    {isCalculating && <span className="text-emerald-600 font-bold flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded-full text-xs"><Navigation className="w-3 h-3 animate-spin" /> Routing...</span>}
                                </div>
                                <div className="text-4xl font-extrabold text-slate-900 flex items-baseline gap-2 tracking-tight">
                                    {isCalculating ? '...' : formData.distance}
                                    <span className="text-lg font-medium text-slate-400">km</span>
                                </div>
                                <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5 border-t border-slate-200 pt-3">
                                    <MapPin className="w-3 h-3" />
                                    Destination: <span className="text-slate-600 font-medium">{OFFICE_ADDRESS}</span>
                                </div>
                            </div>

                            <button
                                disabled={isCalculating || formData.distance === 0}
                                onClick={() => setStep(3)}
                                className="w-full mt-8 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98]"
                            >
                                Next Step <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: HOURS */}
                {step === 3 && (
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in slide-in-from-right-8 duration-500">
                        <div className="p-8">
                            <button onClick={() => setStep(2)} className="text-sm text-slate-400 hover:text-slate-800 mb-6 flex items-center gap-1 font-medium transition-colors">
                                ← Back
                            </button>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-2xl font-bold text-slate-900">Work Session</h2>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Step 3 of 3</span>
                            </div>
                            <p className="text-slate-500 mb-8 text-lg">Estimated hours in office today?</p>

                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-500 border border-slate-100">
                                        <Clock className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-slate-500 mb-1">Duration</div>
                                        <div className="text-3xl font-extrabold text-slate-900">{formData.hours} <span className="text-lg font-medium text-slate-400">hrs</span></div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setFormData({ ...formData, hours: Math.max(1, formData.hours - 1) })} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 font-bold text-slate-600 transition-colors shadow-sm active:scale-95 text-lg">-</button>
                                    <button onClick={() => setFormData({ ...formData, hours: Math.min(24, formData.hours + 1) })} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 font-bold text-slate-600 transition-colors shadow-sm active:scale-95 text-lg">+</button>
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50 text-indigo-900 text-sm rounded-xl mb-8 flex gap-3 border border-indigo-100">
                                <Zap className="w-5 h-5 flex-shrink-0 text-indigo-500" />
                                <p className="leading-relaxed">This duration is used to allocate your specific share of the building's daily electricity footprint.</p>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 active:scale-[0.98]"
                            >
                                Confirm & Log Data
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 4 && (
                    <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">All Set!</h2>
                        <p className="text-slate-500 mb-8 text-lg max-w-sm mx-auto">
                            Your data has been synced.
                            <br />
                            <span className="text-emerald-600 font-medium">Est. Impact: {sessionImpact} kg CO₂e</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => { setStep(1); }} className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors">
                                Log Another
                            </button>
                            <button onClick={() => onNavigate('admin')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                                View Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 5. PAGE: ADMIN DASHBOARD ---

const AdminPage = ({ employees, inputs, setInputs, onNavigate }) => {
    const [showSettings, setShowSettings] = useState(false);

    // --- CORE ACCURACY LOGIC ---

    // 1. Calculate Scope 2 (Electricity)
    const totalElectricityCarbon = useMemo(() => {
        return inputs.electricityKwh * inputs.gridFactor;
    }, [inputs.electricityKwh, inputs.gridFactor]);

    // 2. Calculate Scope 3 (Cloud & Hardware)
    const totalCloudCarbon = useMemo(() => {
        return (inputs.cloudCpuHours * FACTORS.cloudCpu) + (inputs.cloudStorageGb * FACTORS.cloudStorage);
    }, [inputs.cloudCpuHours, inputs.cloudStorageGb]);

    const totalHardwareCarbon = useMemo(() => {
        return inputs.serverCount * FACTORS.serverEmbodied;
    }, [inputs.serverCount]);

    // 3. Allocation Rate (Electricity Only)
    const totalHoursLogged = useMemo(() => employees.reduce((acc, emp) => acc + emp.hoursLogged, 0), [employees]);
    const carbonPerHour = totalHoursLogged > 0 ? (totalElectricityCarbon / totalHoursLogged) : 0;

    // 4. Enrich Employee Data
    const enrichedData = useMemo(() => {
        return employees.map(emp => {
            const commuteFactor = COMMUTE_MODES.find(m => m.id === emp.commute.mode)?.factor || 0;
            const commuteCarbon = emp.commute.distance * 2 * commuteFactor;
            const electricityShare = emp.hoursLogged * carbonPerHour;

            return {
                ...emp,
                commuteCarbon,
                electricityShare,
                totalCarbon: commuteCarbon + electricityShare
            };
        });
    }, [employees, carbonPerHour]);

    // Aggregates
    const totalCommuteCarbon = enrichedData.reduce((acc, curr) => acc + curr.commuteCarbon, 0);
    const totalCompanyCarbon = totalElectricityCarbon + totalCommuteCarbon + totalCloudCarbon + totalHardwareCarbon;

    // Department Data for Chart
    const deptData = useMemo(() => {
        const agg = {};
        enrichedData.forEach(d => {
            if (!agg[d.dept]) agg[d.dept] = 0;
            agg[d.dept] += d.totalCarbon;
        });
        return Object.entries(agg).map(([name, value]) => ({ name, value }));
    }, [enrichedData]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 relative">

            {/* SETTINGS DRAWER */}
            <div className={`fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${showSettings ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Settings className="w-5 h-5 text-indigo-400" /> Configure Data
                        </h2>
                        <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Electricity Input */}
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                <h3 className="font-semibold text-slate-200">Electricity Bill</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Monthly Usage (kWh)</label>
                                    <input
                                        type="number"
                                        value={inputs.electricityKwh}
                                        onChange={(e) => setInputs({ ...inputs, electricityKwh: Math.max(0, Number(e.target.value)) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Grid Factor (kg/kWh)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={inputs.gridFactor}
                                        onChange={(e) => setInputs({ ...inputs, gridFactor: Math.max(0, Number(e.target.value)) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                                    />
                                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1"><Info className="w-3 h-3" /> Default: 0.82 (India Grid Intensity)</p>
                                </div>
                                <div className="pt-3 mt-2 border-t border-slate-800 flex justify-between text-sm">
                                    <span className="text-slate-400">Calculated Scope 2:</span>
                                    <span className="text-yellow-400 font-bold font-mono">{totalElectricityCarbon.toFixed(0)} kg</span>
                                </div>
                            </div>
                        </div>

                        {/* Cloud Input */}
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-2 mb-4">
                                <Cloud className="w-5 h-5 text-sky-400" />
                                <h3 className="font-semibold text-slate-200">Cloud Infrastructure</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Compute (vCPU Hours)</label>
                                    <input
                                        type="number"
                                        value={inputs.cloudCpuHours}
                                        onChange={(e) => setInputs({ ...inputs, cloudCpuHours: Math.max(0, Number(e.target.value)) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Storage (GB)</label>
                                    <input
                                        type="number"
                                        value={inputs.cloudStorageGb}
                                        onChange={(e) => setInputs({ ...inputs, cloudStorageGb: Math.max(0, Number(e.target.value)) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                                    />
                                </div>
                                <div className="pt-3 mt-2 border-t border-slate-800 flex justify-between text-sm">
                                    <span className="text-slate-400">Calculated Scope 3:</span>
                                    <span className="text-sky-400 font-bold font-mono">{totalCloudCarbon.toFixed(0)} kg</span>
                                </div>
                            </div>
                        </div>

                        {/* Hardware Input */}
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <div className="flex items-center gap-2 mb-4">
                                <HardDrive className="w-5 h-5 text-slate-400" />
                                <h3 className="font-semibold text-slate-200">Hardware & On-Prem</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-slate-500 mb-2">Active Rack Servers</label>
                                    <input
                                        type="number"
                                        value={inputs.serverCount}
                                        onChange={(e) => setInputs({ ...inputs, serverCount: Math.max(0, Number(e.target.value)) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 font-mono"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Est. 85kg monthly embodied carbon/unit</p>
                                </div>
                                <div className="pt-3 mt-2 border-t border-slate-800 flex justify-between text-sm">
                                    <span className="text-slate-400">Calculated Scope 3:</span>
                                    <span className="text-slate-200 font-bold font-mono">{totalHardwareCarbon.toFixed(0)} kg</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {showSettings && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]" onClick={() => setShowSettings(false)}></div>}

            {/* Admin Nav */}
            <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('landing')}>
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <LayoutDashboard className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-white text-lg tracking-tight">Green<span className="text-indigo-400">Bit</span> <span className="text-slate-500 font-normal text-sm ml-1">| Admin</span></span>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all border border-slate-700 hover:border-slate-600">
                        <Settings className="w-4 h-4" /> Configure Data
                    </button>
                    <button onClick={() => onNavigate('employee')} className="text-sm font-medium text-slate-500 hover:text-indigo-400 transition-colors px-3 py-2">
                        Switch View
                    </button>
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors relative">
                        <Bell className="w-4 h-4 text-slate-400" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900"></span>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 pt-10">

                {/* CONTROL PANEL HEADER */}
                <div className="mb-10 flex flex-col md:flex-row items-end justify-between gap-6 pb-8 border-b border-slate-800/50">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Company Overview</h2>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Real-time granular monitoring across all emission scopes.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                        <div className="text-right">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Employees</div>
                            <div className="text-2xl font-bold text-white font-mono">{employees.length}</div>
                        </div>
                        <div className="h-10 w-px bg-slate-800"></div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center justify-end gap-1"><Zap className="w-3 h-3" /> Allocation Rate</div>
                            <div className="text-2xl font-bold text-white font-mono">
                                {carbonPerHour.toFixed(2)} <span className="text-sm text-slate-500 font-sans font-normal">kg/hr</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 p-6 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-10 -mt-10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                        <div className="flex items-center gap-2 mb-3">
                            <Leaf className="w-5 h-5 text-emerald-500" />
                            <span className="text-slate-400 text-sm font-medium">Total Footprint</span>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2 tracking-tight">{totalCompanyCarbon.toFixed(0)} <span className="text-lg text-slate-500 font-normal">kg</span></div>
                        <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 w-fit px-2 py-0.5 rounded"><TrendingDown className="w-3 h-3" /> 12% vs last month</div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-yellow-500/30 transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span className="text-slate-400 text-sm font-medium">Electricity (Scope 2)</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1 font-mono">{totalElectricityCarbon.toFixed(0)} <span className="text-lg text-slate-500 font-normal font-sans">kg</span></div>
                        <div className="text-xs text-slate-500 mt-2">Driven by {inputs.electricityKwh.toLocaleString()} kWh usage</div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-sky-500/30 transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                            <Cloud className="w-5 h-5 text-sky-500" />
                            <span className="text-slate-400 text-sm font-medium">Cloud & Infra</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1 font-mono">{(totalCloudCarbon + totalHardwareCarbon).toFixed(0)} <span className="text-lg text-slate-500 font-normal font-sans">kg</span></div>
                        <div className="text-xs text-slate-500 mt-2">AWS, Azure & On-Prem Racks</div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-colors group">
                        <div className="flex items-center gap-2 mb-3">
                            <Car className="w-5 h-5 text-rose-500" />
                            <span className="text-slate-400 text-sm font-medium">Commute (Scope 3)</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1 font-mono">{totalCommuteCarbon.toFixed(0)} <span className="text-lg text-slate-500 font-normal font-sans">kg</span></div>
                        <div className="text-xs text-slate-500 mt-2">Real-time employee telemetry</div>
                    </div>
                </div>

                {/* VISUALIZATION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart */}
                    <div className="lg:col-span-2 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                        <h3 className="font-bold text-lg text-white mb-8">Emissions by Department</h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={deptData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: '#1e293b', opacity: 0.5 }}
                                    />
                                    <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Allocation Table */}
                    <div className="bg-slate-900 p-0 rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-[460px]">
                        <div className="p-6 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg text-white">Live Ledger</h3>
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Real-time bill splitting based on hours.</p>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="bg-slate-950 text-xs uppercase font-bold text-slate-500 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 bg-slate-950">Employee</th>
                                        <th className="px-6 py-3 bg-slate-950 text-center">Hrs</th>
                                        <th className="px-6 py-3 bg-slate-950 text-right">Bill Share</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {enrichedData.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-200">{emp.name}</div>
                                                <div className="text-xs text-slate-500">{emp.timestamp || 'Just now'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-mono">{emp.hoursLogged}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-indigo-400 font-mono font-medium">
                                                {emp.electricityShare.toFixed(2)} <span className="text-slate-600 text-xs">kg</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

// --- 6. ROOT APP COMPONENT ---

export default function GreenBit() {
    const [view, setView] = useState('landing'); // landing, employee, admin
    const [employees, setEmployees] = useState([]);

    // Central Input State for Admin Config (Indian defaults)
    const [inputs, setInputs] = useState({
        electricityKwh: 15000, // Higher consumption typical in Indian offices
        gridFactor: 0.82, // India's grid emission factor (kg CO2e/kWh)
        cloudCpuHours: 4500,
        cloudStorageGb: 1800,
        serverCount: 6
    });

    // Initialize data once
    useEffect(() => {
        setEmployees(generateInitialData());
    }, []);

    const handleLogData = (data) => {
        // Add new entry with "Arjun Reddy" details
        const newEntry = {
            id: Date.now(),
            name: 'Arjun Reddy',
            dept: 'Engineering',
            commute: { mode: data.mode, distance: data.distance },
            hoursLogged: data.hours,
            status: 'Active',
            timestamp: 'Just now'
        };

        // Update state - this immediately affects the "Allocated Rate" in Admin View
        setEmployees(prev => [newEntry, ...prev]);
    };

    return (
        <div className="font-sans">
            {view === 'landing' && <LandingPage onNavigate={setView} />}

            {view === 'employee' && (
                <EmployeePage
                    onNavigate={setView}
                    onLogData={handleLogData}
                />
            )}

            {view === 'admin' && (
                <AdminPage
                    onNavigate={setView}
                    employees={employees}
                    inputs={inputs}
                    setInputs={setInputs}
                />
            )}
        </div>
    );
}

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "./cityofficial.css"

// Fix for default Leaflet icon path issue with bundlers like Webpack
import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// --- Type Definition for a Report ---
type Report = {
    id: number;
    title: string;
    category: string;
    status: string;
    priority: string;
    reportedBy: string;
    date: string;
    location: [number, number];
    description: string;
};

// --- Mock Data ---
// In a real application, this would come from your database or API
const initialReports: Report[] = [
    { id: 1, title: 'Broken Streetlight', category: 'Streetlight', status: 'In Progress', priority: 'Urgent', reportedBy: 'User123', date: '2025-09-18', location: [23.2599, 77.4126], description: 'Near main road, not working for 3 days.' },
    { id: 2, title: 'Pothole on 5th Street', category: 'Pothole', status: 'Submitted', priority: 'High', reportedBy: 'User456', date: '2025-09-17', location: [23.2550, 77.4100], description: 'Large pothole causing traffic issues.' },
    { id: 3, title: 'Overflowing Trash Bin', category: 'Trash', status: 'Pending', priority: 'Urgent', reportedBy: 'User789', date: '2025-09-16', location: [23.2500, 77.4150], description: 'Needs urgent cleaning at the park entrance.' },
    { id: 4, title: 'Water Leak at Park', category: 'Water Leak', status: 'Resolved', priority: 'Low', reportedBy: 'User321', date: '2025-09-15', location: [23.2650, 77.4200], description: 'Pipe burst near the playground.' },
    { id: 5, title: 'Graffiti on Wall', category: 'Graffiti', status: 'Assigned', priority: 'Medium', reportedBy: 'User654', date: '2025-09-14', location: [23.2620, 77.4180], description: 'Offensive graffiti needs removal.' },
    { id: 6, title: 'Traffic Signal Malfunction', category: 'Traffic Signal', status: 'In Progress', priority: 'High', reportedBy: 'User987', date: '2025-09-13', location: [23.2580, 77.4050], description: 'Signal stuck on red at the main intersection.' },
    { id: 7, title: 'Sidewalk Crack', category: 'Sidewalk', status: 'Acknowledged', priority: 'Medium', reportedBy: 'User852', date: '2025-09-12', location: [23.2530, 77.4130], description: 'A large crack is a trip hazard for pedestrians.' },
    { id: 8, title: 'Noise Complaint', category: 'Noise', status: 'Submitted', priority: 'Low', reportedBy: 'User963', date: '2025-09-11', location: [23.2490, 77.4080], description: 'Loud music from the neighboring building late at night.' },
    { id: 9, title: 'Streetlight Flickering', category: 'Streetlight', status: 'Pending', priority: 'Medium', reportedBy: 'User741', date: '2025-09-10', location: [23.2510, 77.4160], description: 'Intermittent issue with the streetlight.' },
    { id: 10, title: 'Other: Tree Fallen', category: 'Other', status: 'Resolved', priority: 'Low', reportedBy: 'User159', date: '2025-09-09', location: [23.2470, 77.4120], description: 'A large tree branch is blocking the road after the storm.' },
];

// --- Helper Components for Styling ---
const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses: { [key: string]: string } = {
        'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
        'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        'Acknowledged': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
        'Submitted': 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
        'Resolved': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
        'Assigned': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
    };
    return <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
    const priorityClasses: { [key: string]: string } = {
        'Urgent': 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
        'High': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
        'Medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
        'Low': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    };
    return <span className={`px-2 py-1 rounded text-xs font-medium ${priorityClasses[priority]}`}>{priority}</span>;
};

export default function AdminDashboardPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [allReports, setAllReports] = useState<Report[]>(initialReports.map(r => ({ ...r, resolvedData: undefined })));
    const [filters, setFilters] = useState({ search: '', status: 'All Status', type: 'All Types' });
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [resolvingReport, setResolvingReport] = useState<Report | null>(null);
    const [resolutionNotes, setResolutionNotes] = useState("");
    const [resolutionImage, setResolutionImage] = useState<string | null>(null);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(isDark);
    }, []);

   useEffect(() => {
    // This now correctly targets the <body> with the '.dark-mode' class
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
}, [isDarkMode]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFilters(prev => ({ ...prev, [id.replace('Filter', '').replace('search', 'search')]: value }));
    };

    const handleMarkResolved = (report: Report) => {
        setResolvingReport(report);
        setResolutionNotes("");
        setResolutionImage(null);
        setShowResolveModal(true);
    };

    const confirmResolve = () => {
        if (resolvingReport) {
            setAllReports(prev => prev.map(report =>
                report.id === resolvingReport.id
                    ? {
                        ...report,
                        status: 'Resolved',
                        resolvedData: {
                            notes: resolutionNotes,
                            image: resolutionImage,
                        },
                    }
                    : report
            ));
        }
        setShowResolveModal(false);
        setResolvingReport(null);
        setResolutionNotes("");
        setResolutionImage(null);
    };

    const cancelResolve = () => {
        setShowResolveModal(false);
        setResolvingReport(null);
        setResolutionNotes("");
        setResolutionImage(null);
    };
    
    const handleViewDetails = (report: Report) => {
        setSelectedReport(report);
        setShowDetailsModal(true);
    };

    const filteredReports = useMemo(() => {
        return allReports.filter(report => {
            const searchMatch = report.title.toLowerCase().includes(filters.search.toLowerCase()) || report.description.toLowerCase().includes(filters.search.toLowerCase());
            const statusMatch = filters.status === 'All Status' || report.status === filters.status;
            const typeMatch = filters.type === 'All Types' || report.category === filters.type;
            return searchMatch && statusMatch && typeMatch;
        });
    }, [allReports, filters]);

    const stats = useMemo(() => {
        const counts = allReports.reduce((acc, report) => {
            acc[report.status] = (acc[report.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        counts['Total Reports'] = allReports.length;
        return counts;
    }, [allReports]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 dark:from-slate-900 dark:to-gray-800 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-4 py-3 rounded-xl shadow-md">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 via-blue-800 to-green-700">
                            <img src="https://i.ibb.co/3yy6jxM9/logo.jpg" alt="Logo" className="w-16 h-16 object-cover rounded-full border-4 border-cyan-700 shadow-lg" />
                            Municipal Admin Dashboard
                        </h1>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Empowering communities to manage civic issues</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg shadow-sm font-semibold">
                            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </header>

                <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl mb-10 p-4">
                    <h2 className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-slate-200">City Civic Issues Map</h2>
                    <div style={{ height: '400px', borderRadius: '0.75rem', overflow: 'hidden' }}>
                        <MapContainer center={[23.2599, 77.4126]} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {filteredReports.map(report => (
                                <Marker key={report.id} position={report.location as L.LatLngExpression}>
                                    <Popup><b>{report.title}</b><br/>{report.status}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-cyan-300">{stats['Total Reports'] || 0}</div><div className="text-sm text-slate-500 dark:text-cyan-400 mt-1">Total Reports</div></div>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-orange-300">{stats['Pending'] || 0}</div><div className="text-sm text-slate-500 dark:text-orange-400 mt-1">Pending</div></div>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-blue-300">{stats['In Progress'] || 0}</div><div className="text-sm text-slate-500 dark:text-blue-400 mt-1">In Progress</div></div>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-yellow-300">{stats['Acknowledged'] || 0}</div><div className="text-sm text-slate-500 dark:text-yellow-400 mt-1">Acknowledged</div></div>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-purple-300">{stats['Submitted'] || 0}</div><div className="text-sm text-slate-500 dark:text-purple-400 mt-1">Submitted</div></div>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-green-300">{stats['Resolved'] || 0}</div><div className="text-sm text-slate-500 dark:text-green-400 mt-1">Resolved</div></div>
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm text-center"><div className="text-3xl font-extrabold text-slate-900 dark:text-indigo-300">{stats['Assigned'] || 0}</div><div className="text-sm text-slate-500 dark:text-indigo-400 mt-1">Assigned</div></div>
                </div>

                <div className="mb-8 bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" id="searchInput" value={filters.search} onChange={handleFilterChange} placeholder="Search reports..." className="bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 focus:border-cyan-500 rounded-lg w-full p-2 transition-all md:col-span-1" />
                        <select id="statusFilter" value={filters.status} onChange={handleFilterChange} className="bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 focus:border-cyan-500 rounded-lg p-2 w-full transition-all">
                            {['All Status', 'Pending', 'In Progress', 'Acknowledged', 'Submitted', 'Resolved', 'Assigned'].map(s => <option key={s}>{s}</option>)}
                        </select>
                        <select id="typeFilter" value={filters.type} onChange={handleFilterChange} className="bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 focus:border-cyan-500 rounded-lg p-2 w-full transition-all">
                           {['All Types', 'Pothole', 'Streetlight', 'Trash', 'Water Leak', 'Graffiti', 'Traffic Signal', 'Sidewalk', 'Noise', 'Other'].map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 font-bold text-slate-800 dark:text-slate-200 text-lg">
                        Reports Management ({filteredReports.length})
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-700">
                                <tr>
                                    <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Title</th>
                                    <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Category</th>
                                    <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                    <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Priority</th>
                                    <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                    <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map(report => (
                                    <tr key={report.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="p-3"><div className="font-semibold text-slate-800 dark:text-slate-200">{report.title}</div><div className="text-xs text-slate-500 dark:text-slate-400">{report.reportedBy}</div></td>
                                        <td className="p-3 text-sm text-slate-600 dark:text-slate-400">{report.category}</td>
                                        <td className="p-3"><StatusBadge status={report.status} /></td>
                                        <td className="p-3"><PriorityBadge priority={report.priority} /></td>
                                        <td className="p-3 text-sm text-slate-600 dark:text-slate-400">{report.date}</td>
                                        <td className="p-3 flex flex-col gap-1">
                                            <button onClick={() => handleViewDetails(report)} className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded">View Details</button>
                                            {report.status !== 'Resolved' && (
                                                <button onClick={() => handleMarkResolved(report)} className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:hover:bg-green-800/50 text-green-700 dark:text-green-300 rounded">Mark Resolved</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <footer className="text-center mt-8 text-slate-500 dark:text-slate-400">
                    © 2025 Municipal Admin Dashboard. All rights reserved.
                </footer>
            </div>

            {/* Report Details Modal */}
            {showDetailsModal && selectedReport && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fadeIn">
                        <button onClick={() => setShowDetailsModal(false)} className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-2xl">&times;</button>
                        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">{selectedReport.title}</h2>
                        <div className="space-y-3 text-slate-600 dark:text-slate-300">
                            <p><strong>Description:</strong> {selectedReport.description}</p>
                            <p><strong>Category:</strong> {selectedReport.category}</p>
                            <p><strong>Reported By:</strong> {selectedReport.reportedBy}</p>
                            <p><strong>Date:</strong> {selectedReport.date}</p>
                            <p><strong>Location:</strong> {selectedReport.location.join(', ')}</p>
                            <div className="flex items-center gap-4"><strong>Status:</strong> <StatusBadge status={selectedReport.status} /></div>
                            <div className="flex items-center gap-4"><strong>Priority:</strong> <PriorityBadge priority={selectedReport.priority} /></div>
                            {/* Show resolution notes and image if present */}
                            {selectedReport.status === 'Resolved' && (selectedReport as any).resolvedData && (
                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                                    <p><strong>Resolution Notes:</strong> {(selectedReport as any).resolvedData.notes}</p>
                                    {(selectedReport as any).resolvedData.image && (
                                        <div className="mt-2">
                                            <p><strong>Resolved Image:</strong></p>
                                            <img src={(selectedReport as any).resolvedData.image} alt="Resolved issue" className="max-h-48 rounded shadow border mt-1" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mark Resolved Modal */}
            {showResolveModal && resolvingReport && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fadeIn">
                        <button onClick={cancelResolve} className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-2xl">&times;</button>
                        <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Mark as Resolved</h2>
                        <div className="space-y-2 text-slate-700 dark:text-slate-200">
                            <p>Are you sure you want to mark <span className="font-semibold">{resolvingReport.title}</span> as <span className="font-semibold text-green-700 dark:text-green-300">Resolved</span>?</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">This action cannot be undone.</p>
                        </div>
                        <div className="mt-4 space-y-3">
                            <label className="block text-sm font-medium">Resolution Notes:</label>
                            <textarea
                                className="w-full rounded border p-2 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                                rows={3}
                                value={resolutionNotes}
                                onChange={e => setResolutionNotes(e.target.value)}
                                placeholder="Enter resolution notes..."
                            />
                            <div className="proof-upload-section mt-4 p-4 rounded-xl border-2 border-dashed border-green-300 bg-green-50 flex flex-col items-center justify-center shadow-lg">
                                <label className="block text-base font-bold text-green-700 mb-2">Proof of Issue Resolved:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm mb-2 bg-white border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 transition-all"
                                    onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = ev => setResolutionImage(ev.target?.result as string);
                                            reader.readAsDataURL(file);
                                        } else {
                                            setResolutionImage(null);
                                        }
                                    }}
                                />
                                {resolutionImage && (
                                    <img src={resolutionImage} alt="Preview" className="max-h-40 mt-3 rounded-xl border-2 border-green-400 shadow-xl" />
                                )}
                                <span className="text-xs text-green-500 mt-2">Upload a clear image as proof of resolution</span>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6 justify-end">
                            <button onClick={cancelResolve} className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600">Cancel</button>
                            <button onClick={confirmResolve} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-semibold">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
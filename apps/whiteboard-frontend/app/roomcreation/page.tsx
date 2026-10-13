"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users, Palette, ArrowRight } from 'lucide-react';

export function RoomCreation() {
    const [roomName, setRoomName] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const createRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Generate a unique room ID
        const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // In a real app, you'd save this to a database
        // For now, we'll just navigate to the canvas
        setTimeout(() => {
            router.push(`/canvas/${roomId}`);
        }, 500);
    };

    const joinRoom = () => {
        const roomId = prompt('Enter Room ID:');
        if (roomId) {
            router.push(`/canvas/${roomId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-6">
            {/* Animated background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-lg shadow-purple-500/25">
                        <Palette className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Create Your Drawing Room
                    </h1>
                    <p className="text-xl text-gray-300">
                        Start collaborating with your team in real-time
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Create New Room Card */}
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 mx-auto">
                            <Plus className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Create New Room</h2>
                        <form onSubmit={createRoom} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Room Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    placeholder="My Drawing Room"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <span>{loading ? 'Creating...' : 'Create Room'}</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Join Existing Room Card */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 mx-auto">
                            <Users className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Join Existing Room</h2>
                        <div className="space-y-4">
                            <p className="text-gray-300 text-center mb-6">
                                Have a room ID? Join your team's drawing session
                            </p>
                            <button
                                onClick={joinRoom}
                                className="w-full border-2 border-blue-500/50 px-6 py-4 rounded-xl text-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span>Join Room</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Rooms Section */}
                <div className="mt-12 bg-gradient-to-br from-gray-900/50 to-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                        Recent Rooms
                    </h3>
                    <p className="text-gray-400 text-center py-8">
                        No recent rooms. Create your first room to get started!
                    </p>
                </div>
            </div>
        </div>
    );
}
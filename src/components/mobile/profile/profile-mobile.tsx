"use client"

import { useState } from "react"
import { User, Edit3, Save, X, Trash2, Camera, Heart, Mail, Calendar } from 'lucide-react'
import { useProfileCrud } from "../../../hooks/useProfile"

export default function ProfileMobile() {
  const { profile, loading, error, updateProfile, deleteAccount } = useProfileCrud()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
  })

  const handleSave = async () => {
    const success = await updateProfile(editForm)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
    })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const success = await deleteAccount()
    if (success) {
      setShowDeleteConfirm(false)
      // Redirect logic here
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-6 h-6 text-pink-500" />
          <h1 className="text-2xl font-bold text-pink-800">My Profile</h1>
          <Heart className="w-6 h-6 text-pink-500" />
        </div>
        <p className="text-pink-600 text-sm">Manage your account settings</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        {/* Avatar Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              src={profile.avatar || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-200 shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full shadow-lg hover:bg-pink-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        {!isEditing ? (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pink-800 mb-1">{profile.name}</h2>
              <p className="text-pink-600 text-sm mb-4">{profile.bio}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
                <Mail className="w-5 h-5 text-pink-500" />
                <span className="text-pink-800">{profile.email}</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl">
                <Calendar className="w-5 h-5 text-pink-500" />
                <span className="text-pink-800">Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        ) : (
          /* Edit Form */
          <div className="space-y-4">
            <div>
              <label className="block text-pink-800 font-medium mb-2">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800"
              />
            </div>

            <div>
              <label className="block text-pink-800 font-medium mb-2">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800"
              />
            </div>

            <div>
              <label className="block text-pink-800 font-medium mb-2">Bio</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save"}
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h3>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-red-600 transition-all duration-200"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-red-600 text-sm">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

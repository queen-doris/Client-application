'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/store/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { apiService } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner'; // or your preferred toast library

export default function ClientProfilePage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || !user || user.role !== 'client') {
      router.push('/client/login');
    }
  }, [loading, isAuthenticated, user, router]);

  const handleDeleteAccount = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      // Use the API service method instead of direct fetch
      await apiService.deleteClientAccount();
      
      // Show success message
      toast.success('Account deleted successfully');
      
      // Logout and redirect
      await logout();
      router.push('/');
      
    } catch (error: any) {
      console.error('Failed to delete account:', error);
      toast.error(error.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleForceDelete = async () => {
    try {
      // Fallback: Direct fetch with proper error handling
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/client/account`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
            ...(localStorage.getItem('sessionId') ? { 
              'X-Session-ID': localStorage.getItem('sessionId') as string 
            } : {}),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      toast.success('Account deleted successfully');
      
      // Clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('sessionId');
      window.location.href = '/';
      
    } catch (error: any) {
      console.error('Failed to delete account:', error);
      toast.error(error.message || 'Failed to delete account. Please try again.');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Profile</span>
              <Button 
                variant="outline" 
                onClick={() => router.push('/client/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Name</div>
              <div className="text-lg font-medium">{user.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="text-lg font-medium">{user.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">Status</div>
              <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                {user.isVerified ? 'Verified' : 'Pending Verification'}
              </Badge>
            </div>
            <div className="pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account 
                      and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
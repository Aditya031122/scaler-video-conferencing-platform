'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMeeting } from '@/lib/hooks/useMeeting'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Video, Loader2 } from 'lucide-react'

const joinMeetingSchema = z.object({
  meeting_id: z.string().min(1, 'Meeting ID is required'),
  display_name: z.string().min(1, 'Display name is required').max(100, 'Display name must be less than 100 characters'),
})

type JoinMeetingFormData = z.infer<typeof joinMeetingSchema>

export default function JoinMeetingPage() {
  const router = useRouter()
  const { joinMeeting, loading } = useMeeting()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinMeetingFormData>({
    resolver: zodResolver(joinMeetingSchema),
    defaultValues: {
      meeting_id: '',
      display_name: '',
    },
  })

  const onSubmit = async (data: JoinMeetingFormData) => {
    setIsSubmitting(true)
    try {
      const meeting = await joinMeeting(data)
      if (meeting) {
        toast.success('Joined meeting successfully!')
        router.push(`/room/${meeting.meeting_id}`)
      }
    } catch (error) {
      toast.error('Failed to join meeting')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Join Meeting</h1>
          <p className="text-muted-foreground">
            Enter the meeting ID to join an existing meeting
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meeting_id">Meeting ID *</Label>
                <Input
                  id="meeting_id"
                  placeholder="Enter the meeting ID"
                  {...register('meeting_id')}
                />
                {errors.meeting_id && (
                  <p className="text-sm text-destructive">{errors.meeting_id.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name *</Label>
                <Input
                  id="display_name"
                  placeholder="Enter your name"
                  {...register('display_name')}
                />
                {errors.display_name && (
                  <p className="text-sm text-destructive">{errors.display_name.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

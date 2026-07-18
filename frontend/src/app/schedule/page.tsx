'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMeeting } from '@/lib/hooks/useMeeting'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Calendar, Clock, Loader2 } from 'lucide-react'

const scheduleMeetingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().optional(),
  host_name: z.string().min(1, 'Host name is required').max(100, 'Host name must be less than 100 characters'),
  scheduled_date: z.string().min(1, 'Date is required'),
  scheduled_time: z.string().min(1, 'Time is required').max(10, 'Invalid time format'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
})

type ScheduleMeetingFormData = z.infer<typeof scheduleMeetingSchema>

export default function ScheduleMeetingPage() {
  const router = useRouter()
  const { scheduleMeeting, loading } = useMeeting()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleMeetingFormData>({
    resolver: zodResolver(scheduleMeetingSchema),
    defaultValues: {
      title: '',
      description: '',
      host_name: 'Current User',
      scheduled_date: '',
      scheduled_time: '',
      duration: 60,
    },
  })

  const onSubmit = async (data: ScheduleMeetingFormData) => {
  setIsSubmitting(true)

  try {
    const payload = {
      ...data,
      scheduled_date: `${data.scheduled_date}T00:00:00`,
    }

    console.log("Payload:", payload)

    const meeting = await scheduleMeeting(payload)

    if (meeting) {
      toast.success("Meeting scheduled successfully!")
      router.push(`/room/${meeting.meeting_id}`)
    }
  } catch (error) {
    console.error(error)
    toast.error("Failed to schedule meeting")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Schedule Meeting</h1>
          <p className="text-muted-foreground">
            Plan a meeting for a future date and time
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Weekly Team Standup"
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description for your meeting..."
                  rows={3}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="host_name">Host Name *</Label>
                <Input
                  id="host_name"
                  {...register('host_name')}
                />
                {errors.host_name && (
                  <p className="text-sm text-destructive">{errors.host_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduled_date">Date *</Label>
                  <Input
                    id="scheduled_date"
                    type="date"
                    {...register('scheduled_date')}
                  />
                  {errors.scheduled_date && (
                    <p className="text-sm text-destructive">{errors.scheduled_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduled_time">Time *</Label>
                  <Input
                    id="scheduled_time"
                    type="time"
                    {...register('scheduled_time')}
                  />
                  {errors.scheduled_time && (
                    <p className="text-sm text-destructive">{errors.scheduled_time.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  {...register('duration', { valueAsNumber: true })}
                />
                {errors.duration && (
                  <p className="text-sm text-destructive">{errors.duration.message}</p>
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
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
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

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Video, Calendar, Clock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMeeting } from '@/lib/hooks/useMeeting'
import { toast } from 'sonner'

export function QuickActions() {
  const router = useRouter()
  const { createMeeting, loading } = useMeeting()
  const [isCreating, setIsCreating] = useState(false)

  const handleInstantMeeting = async () => {
    setIsCreating(true)
    try {
      const meeting = await createMeeting({
        title: 'Instant Meeting',
        host_name: 'Current User',
      })
      if (meeting) {
        toast.success('Meeting created successfully!')
        router.push(`/room/${meeting.meeting_id}`)
      }
    } catch (error) {
      toast.error('Failed to create meeting')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link href="/schedule">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Schedule Meeting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Plan a meeting for a future date and time
            </p>
          </CardContent>
        </Card>
      </Link>
      
      <Link href="/join">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Join Meeting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join an existing meeting with a meeting ID
            </p>
          </CardContent>
        </Card>
      </Link>
      
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Instant Meeting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Start a meeting right now
          </p>
          <Button 
            className="w-full" 
            onClick={handleInstantMeeting}
            disabled={isCreating || loading}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Start Now'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

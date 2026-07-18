'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Users, 
  MessageSquare, 
  Copy,
  MoreVertical,
  Monitor,
  Hand
} from 'lucide-react'
import { toast } from 'sonner'

export default function MeetingRoomPage() {
  const params = useParams()
  const router = useRouter()
  const meetingId = params.meetingId as string
  
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isScreenShare, setIsScreenShare] = useState(false)
  const [showParticipants, setShowParticipants] = useState(true)
  const [showChat, setShowChat] = useState(false)

  const handleCopyInviteLink = () => {
    const link = `${window.location.origin}/join?meeting_id=${meetingId}`
    navigator.clipboard.writeText(link)
    toast.success('Invite link copied to clipboard')
  }

  const handleLeaveMeeting = () => {
    toast.success('Leaving meeting...')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">Team Standup Meeting</h1>
              <Badge variant="default">Live</Badge>
              <span className="text-sm text-muted-foreground">
                ID: {meetingId}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyInviteLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              <Button variant="outline" size="sm" onClick={handleLeaveMeeting}>
                <PhoneOff className="mr-2 h-4 w-4" />
                Leave
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <Card className="bg-slate-900">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12" />
                    </div>
                    <p className="font-semibold">You</p>
                    <p className="text-sm text-slate-400">Current User</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12" />
                    </div>
                    <p className="font-semibold">Alice Smith</p>
                    <p className="text-sm text-slate-400">Participant</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12" />
                    </div>
                    <p className="font-semibold">Bob Johnson</p>
                    <p className="text-sm text-slate-400">Participant</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12" />
                    </div>
                    <p className="font-semibold">Charlie Brown</p>
                    <p className="text-sm text-slate-400">Participant</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="border-t bg-background p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={isCameraOn ? "outline" : "destructive"}
                size="lg"
                onClick={() => setIsCameraOn(!isCameraOn)}
              >
                {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={isScreenShare ? "default" : "outline"}
                size="lg"
                onClick={() => setIsScreenShare(!isScreenShare)}
              >
                <Monitor className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
              >
                <Hand className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowParticipants(!showParticipants)}
              >
                <Users className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                onClick={handleLeaveMeeting}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {showParticipants && (
          <div className="w-80 border-l bg-background hidden lg:block">
            <Card className="h-full rounded-none border-0 border-l">
              <CardHeader>
                <CardTitle className="text-lg">Participants (4)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">You (Host)</p>
                    <p className="text-xs text-muted-foreground">Current User</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Alice Smith</p>
                    <p className="text-xs text-muted-foreground">Participant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Bob Johnson</p>
                    <p className="text-xs text-muted-foreground">Participant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Charlie Brown</p>
                    <p className="text-xs text-muted-foreground">Participant</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {showChat && (
          <div className="w-80 border-l bg-background hidden lg:block">
            <Card className="h-full rounded-none border-0 border-l">
              <CardHeader>
                <CardTitle className="text-lg">Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="text-sm font-medium">Alice Smith</p>
                    <p className="text-sm">Hello everyone!</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="text-sm font-medium">Bob Johnson</p>
                    <p className="text-sm">Good morning!</p>
                  </div>
                  <div className="bg-primary p-3 rounded-lg text-primary-foreground ml-8">
                    <p className="text-sm font-medium">You</p>
                    <p className="text-sm">Let's get started</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button size="sm">Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

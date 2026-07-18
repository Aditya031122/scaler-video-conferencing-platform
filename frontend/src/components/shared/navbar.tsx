'use client'

import Link from 'next/link'
import { Video, Calendar, Clock, History } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Scaler Meetings</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/schedule">
              <Button variant="ghost" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="ghost" size="sm">
                <Video className="mr-2 h-4 w-4" />
                Join
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost" size="sm">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

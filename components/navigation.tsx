import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, User, Settings, GraduationCap } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Study Coach</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/classes" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Classes</span>
            </Link>
            
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Button>
            </Link>
            
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

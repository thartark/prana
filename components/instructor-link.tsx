import Link from "next/link"

interface InstructorLinkProps {
  instructorId: string
  name: string
  className?: string
  isAdmin?: boolean
}

export function InstructorLink({ instructorId, name, className = "", isAdmin = false }: InstructorLinkProps) {
  // Admin links go to staff management, public links go to public instructor page
  const href = isAdmin ? `/admin/staff/${instructorId}` : `/instructors/${instructorId}`
  
  return (
    <Link
      href={href}
      className={`text-primary hover:underline font-medium transition-colors ${className}`}
    >
      {name}
    </Link>
  )
}

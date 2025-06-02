import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function SubscribeSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary to-primary-foreground p-12 text-white flex items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="mb-6">
                  Subscribe to our newsletter to receive the latest updates on new lessons, worksheets, and Spanish
                  learning resources.
                </p>
                <div className="flex items-center gap-2 text-white/80">
                  <Mail className="h-5 w-5" />
                  <span>Delivered straight to your inbox</span>
                </div>
              </div>
            </div>
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground mb-6">Get the latest Spanish learning resources and updates.</p>
              <div className="space-y-4">
                <Input type="email" placeholder="Enter your email" className="h-12" />
                <Button className="w-full h-12">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const ContactForm = () => {

  return (
    <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <Card className="p-8 shadow-card border-2">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send Us a Message</h2>
            <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="How can we help you?" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                rows={6}
                required
                />
            </div>

            <Button type="submit" size="lg" className="w-full">
                Send Message
            </Button>

            <p className="text-sm text-muted-foreground text-center">
                We typically respond within 1-2 business days.
            </p>
            </form>
        </Card>
    </div>
  )
}

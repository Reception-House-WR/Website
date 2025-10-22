import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, FileText } from 'lucide-react'

const reports = [
  { year: "2024", title: "Annual Report", size: "2.4 MB" },
  { year: "2024", title: "Financial Statement", size: "1.8 MB" },
  { year: "2023", title: "Annual Report", size: "2.1 MB" },
  { year: "2023", title: "Financial Statement", size: "1.6 MB" },
];

export const Reports = () => {
  return (
    <div className="animate-fade-in">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Transparency & Accountability</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our annual reports and financial statements to see how we steward resources and deliver on our mission.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {reports.map((report, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-soft transition-all duration-300 border-1 hover:border-blue-500/80"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.year} • {report.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                View All Reports
              </Button>
            </div>
    </div>

  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ContestRules() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contest Rules & Guidelines</CardTitle>
          <CardDescription>Please review all rules before submitting your video entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Open to all K-12 students and classes</li>
              <li>Individual entries must be submitted by a single student</li>
              <li>Class entries must be submitted by a teacher on behalf of the class</li>
              <li>All participants must have appropriate media release forms on file</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Video Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Individual entries: 15-30 seconds in length</li>
              <li>Class entries: 1-2 minutes in length</li>
              <li>Videos must be in MP4, MOV, AVI, or WebM format</li>
              <li>Maximum file size: 200MB for individual entries, 500MB for class entries</li>
              <li>Videos must showcase Spanish language skills through song, rap, poetry, or dialogue</li>
              <li>Content must be original and appropriate for all ages</li>
              <li>Videos must not contain copyrighted material</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Judging Criteria</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Spanish language accuracy and pronunciation (30%)</li>
              <li>Creativity and originality (30%)</li>
              <li>Performance quality (20%)</li>
              <li>Educational value (20%)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Can I submit more than one video?</h4>
                <p className="text-muted-foreground">
                  Yes, you can submit up to three individual entries. Teachers can submit one class entry per class.
                </p>
              </div>
              <div>
                <h4 className="font-medium">When will winners be announced?</h4>
                <p className="text-muted-foreground">
                  Winners will be announced within 30 days after the contest closing date.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Can I edit my submission after uploading?</h4>
                <p className="text-muted-foreground">
                  No, submissions cannot be edited after uploading. Please ensure your video is finalized before
                  submitting.
                </p>
              </div>
              <div>
                <h4 className="font-medium">How are votes counted?</h4>
                <p className="text-muted-foreground">
                  Public votes account for 50% of the final score. The other 50% comes from our panel of judges.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Prizes & Recognition</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Individual Entry Prizes</h4>
                <ul className="list-disc pl-5">
                  <li>1st Place: $100 gift card and featured spotlight on Yo Hablo website</li>
                  <li>2nd Place: $50 gift card and digital certificate</li>
                  <li>3rd Place: $25 gift card and digital certificate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Class Entry Prizes</h4>
                <ul className="list-disc pl-5">
                  <li>1st Place: $200 in classroom supplies and featured spotlight</li>
                  <li>2nd Place: $100 in classroom supplies and digital certificate</li>
                  <li>3rd Place: $50 in classroom supplies and digital certificate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Recognition</h4>
                <p className="text-muted-foreground">
                  All participants will receive a digital certificate of participation. Winning videos will be featured
                  on the Yo Hablo website and social media channels.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

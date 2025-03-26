import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              At Precision Academic World, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">We may collect information about you in various ways, including:</p>
            
            <h3 className="font-semibold mt-4 mb-2">Personal Data</h3>
            <p>Personally identifiable information that you provide to us when registering for an account or using our services, such as:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Profile information</li>
            </ul>
            
            <h3 className="font-semibold mt-4 mb-2">Usage Data</h3>
            <p>Information about how you use our platform, including:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Test results and scores</li>
              <li>Time spent on tests</li>
              <li>Areas of academic strength and weakness</li>
              <li>Log data (IP address, browser type, pages visited)</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">We may use the information we collect for various purposes, including:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Providing, maintaining, and improving our platform</li>
              <li>Personalizing your experience on our platform</li>
              <li>Analyzing usage patterns to enhance our services</li>
              <li>Communicating with you about updates, features, and offers</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Protecting our platform from unauthorized access and misuse</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In the event of a merger, acquisition, or sale of all or a portion of our assets</li>
            </ul>
            <p>
              We may share anonymized, aggregated data (such as anonymous usage statistics) with third parties for research and analysis purposes.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations.
            </p>
            <p>
              You can request deletion of your account and personal information at any time by contacting us.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us using the information provided in Section 10.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              Our platform is designed for use by students and educators. We do not knowingly collect personal information from children under 13 without parental consent. If we learn that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>10. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2 font-medium">privacy@precisionacademicworld.com</p>
          </CardContent>
        </Card>
        
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

export default Privacy;

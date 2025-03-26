import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              By accessing or using Precision Academic World, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              To access certain features of the platform, you must create an account. You are responsible for maintaining the confidentiality of your account information and password. You are also responsible for all activities that occur under your account.
            </p>
            <p>
              You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with this provision.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. User Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              Users may contribute content to the platform, such as profile information. You retain all rights to your content, but grant us a non-exclusive license to use, reproduce, modify, and display such content on our platform.
            </p>
            <p>
              You agree not to post content that:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Infringes on the intellectual property rights of others</li>
              <li>Is illegal, harmful, threatening, abusive, or harassing</li>
              <li>Contains viruses or malicious code</li>
              <li>Advertises products or services without our permission</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Platform Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              You agree to use the platform only for lawful purposes and in a way that does not infringe upon the rights of others. Prohibited activities include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Attempting to bypass any security measures</li>
              <li>Using the platform to distribute unsolicited promotional content</li>
              <li>Impersonating any person or entity</li>
              <li>Interfering with the proper functioning of the platform</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              The content on Precision Academic World, including text, graphics, logos, and software, is owned by or licensed to us and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, or create derivative works based on our content without explicit permission.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              We may terminate or suspend your account and access to the platform immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our discretion.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with your use of the platform.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              We reserve the right to modify these terms at any time. We will provide notice of any material changes by posting the new terms on the platform. Your continued use of the platform after such modifications will constitute your acknowledgment and agreement to the modified terms.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>9. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2 font-medium">support@precisionacademicworld.com</p>
          </CardContent>
        </Card>
        
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

export default Terms;

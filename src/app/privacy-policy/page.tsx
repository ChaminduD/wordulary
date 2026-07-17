import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lastUpdated={siteConfig.privacyLastUpdated}
        >
            <LegalSection title="Introduction">
                <p>
                    Wordulary is an AI-powered vocabulary learning application that helps
                    users save, organize, and review words to improve their vocabulary.
                </p>

                <p>
                    This Privacy Policy explains what information we collect, how we use it,
                    and the choices you have regarding your personal information when using
                    Wordulary.
                </p>
            </LegalSection>

            <LegalSection title="Information We Collect">
                <p>
                    When you create an account or use Wordulary, we may collect the
                    following information:
                </p>

                <ul className="list-disc space-y-2 pl-6">
                    <li>Your name (if provided through Google Sign-In).</li>

                    <li>Your email address.</li>

                    <li>The vocabulary terms, collections, notes, and learning progress you create.</li>
                </ul>
            </LegalSection>

            <LegalSection title="How We Use Your Information">
                <p>
                    We use the information we collect to:
                </p>

                <ul className="list-disc space-y-2 pl-6">
                    <li>Provide and maintain your Wordulary account.</li>

                    <li>Save and organize your vocabulary and collections.</li>

                    <li>Generate AI-powered vocabulary content.</li>

                    <li>Track your learning progress.</li>

                    <li>Improve the performance and reliability of Wordulary.</li>
                </ul>
            </LegalSection>

            <LegalSection title="Third-Party Services">
                <p>
                    Wordulary relies on third-party services to provide certain
                    features.
                </p>

                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        <strong>Supabase</strong> is used for authentication and securely
                        storing your account and vocabulary data.
                    </li>

                    <li>
                        <strong>Google Sign-In</strong> is available as an optional sign-in
                        method through your Google account.
                    </li>

                    <li>
                        <strong>Google Gemini</strong> is used to generate AI-powered
                        vocabulary definitions, examples, and related content.
                    </li>
                </ul>
            </LegalSection>

            <LegalSection title="Data Security">
                <p>
                    We take reasonable measures to protect your personal information and
                    vocabulary data. However, no method of transmission over the internet
                    or electronic storage is completely secure, and we cannot guarantee
                    absolute security.
                </p>
            </LegalSection>

            <LegalSection title="Your Rights">
                <p>
                    You may update or delete your account information at any time through
                    your account settings where available. If you have questions about your
                    personal data or would like to request its removal, please contact us.
                </p>
            </LegalSection>

            <LegalSection title="Changes to This Policy">
                <p>
                    We may update this Privacy Policy from time to time to reflect changes
                    to Wordulary or legal requirements. Any updates will be posted on this
                    page with a revised &quot;Last updated&quot; date.
                </p>
            </LegalSection>

            <LegalSection title="Contact">
                <p>
                    If you have any questions about this Privacy Policy, please contact us
                    through the project&apos;s official contact channels when available.
                </p>
            </LegalSection>
        </LegalLayout>
    );
}
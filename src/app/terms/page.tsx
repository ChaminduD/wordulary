import { LegalLayout } from "@/components/legal/legal-layout";
import { LegalSection } from "@/components/legal/legal-section";

export default function TermsPage() {
    return (
        <LegalLayout
            title="Terms of Service"
            lastUpdated="June 2026"
        >
            <LegalSection title="Acceptance of Terms">
                <p>
                    By creating an account or using Wordulary, you agree to these Terms of
                    Service. If you do not agree with these terms, please do not use the
                    application.
                </p>
            </LegalSection>

            <LegalSection title="Accounts">
                <p>
                    You are responsible for maintaining the security of your account and for
                    any activity that occurs under your account. You agree to provide
                    accurate information when creating an account.
                </p>
            </LegalSection>

            <LegalSection title="Acceptable Use">
                <p>
                    You agree to use Wordulary responsibly and not to:
                </p>

                <ul className="list-disc space-y-2 pl-6">
                    <li>Use the service for unlawful purposes.</li>

                    <li>Attempt to gain unauthorized access to the application or its systems.</li>

                    <li>Interfere with the normal operation or security of the service.</li>

                    <li>Abuse AI features or intentionally misuse the platform.</li>
                </ul>
            </LegalSection>

            <LegalSection title="Intellectual Property">
                <p>
                    Wordulary, including its design, branding, software, and original
                    content, is the intellectual property of its creator unless otherwise
                    stated. You retain ownership of the vocabulary content you create within
                    your account.
                </p>
            </LegalSection>

            <LegalSection title="Termination">
                <p>
                    We reserve the right to suspend or terminate access to Wordulary if
                    these Terms of Service are violated or if necessary to protect the
                    security and integrity of the application.
                </p>
            </LegalSection>

            <LegalSection title="Disclaimer">
                <p>
                    Wordulary is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
                    warranties of any kind. While we strive to provide accurate AI-generated
                    vocabulary content, we cannot guarantee that every definition, example,
                    or suggestion will always be complete or error-free.
                </p>
            </LegalSection>

            <LegalSection title="Changes to These Terms">
                <p>
                    We may update these Terms of Service from time to time. Any changes will
                    be published on this page with an updated revision date.
                </p>
            </LegalSection>

            <LegalSection title="Contact">
                <p>
                    If you have questions about these Terms of Service, please contact us
                    through the project&apos;s official contact channels when available.
                </p>
            </LegalSection>
        </LegalLayout>
    );
}
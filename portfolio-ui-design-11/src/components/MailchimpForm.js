import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Newsletter } from "./Newsletter";

// Mailchimp uses JSONP; the public URL must be a trusted HTTPS form endpoint.
function getPostUrl() {
  const { VITE_MAILCHIMP_URL: base, VITE_MAILCHIMP_U: user, VITE_MAILCHIMP_ID: id } = import.meta.env;
  if (!base || !user || !id) return null;
  try {
    const url = new URL(base);
    if (url.protocol !== "https:" || !url.pathname.endsWith("/post")) return null;
    url.searchParams.set("u", user);
    url.searchParams.set("id", id);
    return url.toString();
  } catch {
    return null;
  }
}

export const MailchimpForm = () => {
  const postUrl = getPostUrl();
  if (!postUrl) return <Newsletter configured={false} />;

  return (
    <MailchimpSubscribe
      url={postUrl}
      render={({ subscribe, status, message }) => (
        <Newsletter configured status={status} message={message} onValidated={subscribe} />
      )}
    />
  );
};

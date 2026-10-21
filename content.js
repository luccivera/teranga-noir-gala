/* =====================================================================
   TERENAGA NOIR GALA — SITE CONTENT
   Edit the values between the quotes, save, and re-upload the folder.
   Everything on the page (desktop AND mobile) updates from this file.
   Keep the quotes and the commas at the end of each line.
   Anything left as "" keeps its [placeholder] on the page, so you can see what is missing.
   ===================================================================== */
window.GALA = {
  /* ---- Date & time ---- */
  date: "2026-11-29", // YYYY-MM-DD, e.g. "2026-11-21"
  doors: "18:00", // 24-hour clock, e.g. "18:00" = 6:00 PM
  program: "19:00", // when the program begins, e.g. "19:15"
  ends: "23:59", // used for the "Add to calendar" file, e.g. "23:30"

  /* ---- Tickets ---- */
  ticketLink: "", // paste your CanadaHelps event link
  ticketPlatform: "CanadaHelps", // shown under the ticket cards
  purchaseNote: "", // optional line after it, e.g. "Tax receipts are issued for the eligible portion."
  price: {
    single: "$250",
    table: "$2,500",
    rising: "$10,000",
    standingFirm: "$7,500",
    rooted: "$5,000",
  },
  /* ---- Card buttons ----
     Each ticket and sponsor card has its own button. Paste a link for each one.
     Left blank: ticket buttons use ticketLink above; sponsor buttons email sponsorshipEmail. */
  links: {
    single: "", // "Purchase Ticket" on the Individual Ticket card
    table: "", // "Purchase Table" on the Table of 10 card
    rising: "", // "Become a Rising Partner"
    standingFirm: "", // "Become a Standing Firm Partner"
    rooted: "", // "Become a Rooted Partner"
  },

  courses: "three", // "A three-course dinner…"

  /* ---- Contact ---- */
  galaEmail: "",
  sponsorshipEmail: "",
  phone: "416-644-3536",

  /* ---- Links ---- */
  sponsorshipPackage: "assets/sponsorship-package.pdf", // drop the PDF in the assets folder
  instagram: "https://instagram.com/taibuchc", // full link, e.g. "https://instagram.com/taibuchc"
  facebook: "", // not used
  taibuWebsite: "https://taibuchc.ca",

  /* ---- TAIBU details (footer) ---- */
  taibuAddress: "1-27 Tapscott Road\nScarborough, ON M1B 4Y7", // use \n for a new line, e.g. "Street\nScarborough, ON A1A 1A1"
  charityNumber: "80696 0357 RR0001",

  /* ---- FAQ answers (draft wording — confirm with finance) ---- */
  faq: {
    refund:
      "Tickets are non-refundable but can be transferred to another guest. Email us the new guest's name before the event.",
    taxReceipt:
      "A charitable tax receipt is issued for the eligible portion of each ticket, less the value of dinner and entertainment.",
  },

  /* ---- Calendar entry ---- */
  venueName: "",
  venueAddress: "585 Dundas Street East, Toronto, ON M5A 2B7",
};

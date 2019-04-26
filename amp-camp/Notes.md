==URLS==
https://ampstart-iframes.firebaseapp.com/templates/e-commerce/landing.amp.html

==THINGS TO BLOG ABOUT==
When you build unminified CSS from SASS, you need to postprocess the CSS to remove any spurious CSS UTF-8 directive.


==TO DO:==
* Fix bug in original template where close button doesn't look good on desktops.

* Deal with .ampstart-nav-dropdown

* See if   display: flex;
  flex-direction: column;
  justify-content: center;
 are really used in .hero-content on desktop devices or not

* text over pictures on home page looks bad on original, and also on our new version

* Why were "Shop" and "Read" buttons alternating white and black before? How did we lose that, presumably while copying stuff?

* In main body, still need to make text white sometimes, black other times... if we care, since we may not have those photos in the new site

* Still need to get rid of CSS rule with .h1, .h2 classes etc, as soon as we get rid of those classes in the HTML

* Replace all commerce-loading classes with loading class
* Replace all ampstart-input with input-container class
* Replace all ampstart-input-radio with radio-container class

* Cart isn't centered vertically on desktops. Don't know why.

* Create version of cart-summary.html partial that has no checkout once we've got mustache templates. Because it should have checkout in cart-summary.html, but not in checkout.html

* Provide options in cart-items.html to not show "X" on checkout page or Continue button on cart page -->

==CSS NOTES==

Got rid of commerce-hero-content-theme-primary, which didn't seem to be used anywhere in CSS. Just in index.html

==LAUNCH PROCESS==
https://domains.google.com
https://standards.google/guidelines/brand-standards/naming/naming-process.html
go/releasing/preparing
https://sites.google.com/a/google.com/ariane/ariane-team?pli=1
Special domains: https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Special-Use_Domains

==BETTER IMAGES==
In the original site, narrow was 750x573 px. Wide was 2560x800.
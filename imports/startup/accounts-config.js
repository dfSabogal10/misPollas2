import { Accounts } from 'meteor/accounts-base';

/** Chevere que se va más allá de usar la herramienta solo como esta**/
Accounts.ui.config({
 passwordSignupFields: 'USERNAME_ONLY',
});

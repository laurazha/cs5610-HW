# README HW3
Below are some notes about the elements I intentionally changed/added 
from professor's sample codes or homework descriptions.
The purpose is to make it easier for TA to grade.

## Existing test cases
Since not every user has a website, and not every website has a widget, here is an existing flow:
Login with username "alice" and password "alice".
Choose website "Gizmodo", then page "Post 1".
Feel free to test with more cases after registering and creating new elements.

## Added "update" buttons
In website-edit, page-edit and widget-edit, I added an "update" button below the inputs, 
in addition to the glyphicon-ok icon on the top right. 
The color of this button is set to green (btn-success).
They both achieve the same result - saving the updates.
The reason I added this explicit button is:
Even if our app is mobile-first, I assume TAs will grade on laptops. 
A large button is easier to gain attention than the small icon in the corner.

## To cancel a widget creation
As instructed in the homework descriptions, editing an existing widget and adding a new widget 
will both lead to the widget-edit page.
So once you click the plus icon in the widget-list page, a new widget is created, with an ID initially.
If you want to cancel this action, you'll have to click the delete button in the edit page, 
otherwise an empty widget will still appear on the page.

## Header size
This is my assumption about the measure of the header size: 
Header size = 1 indicates a <h1> html tag; size = 2 indicates <h2> tag. And there are <h1> to <h6> tags in total.
Because the examples (given in hw descriptions) of size = 2 and size = 4 won't make sense if it means pixels.
And I don't want to use in-line styling or complex JS to dynamically adjust the font size, either.

## Home page
Because I built this assignment upon the last one, 
it will be not-so-pretty if I keep the login, profile and register links on every page, 
like the professor did in sample codes. So I removed them and made the login page the home page.

## Deleted some input fields
In widget-edit pages of different types, some input fields are not consistent with 
the attributes given in hw descriptions. E.g. text for image/youtube. 
So I simply deleted such input fields to make it clean.

## Widget name
There is an input field of widget name in every widget-edit pages. 
But widgets don't have a name in model. 
So I changed this field to widget ID, and disabled it from editing, 
because I don't want to allow users to change the unique id.

## Widget subclasses
To maintain both simplicity and consistency with the way hw descriptions declare a specific widget, 
I didn't create subclasses, which may be a better but complex design. 
Instead, I have only one Widget class with all the attributes an arbitrary widget could have, 
and packaged the "constructors" of different types with static functions. 

## Error handler
If the user enters an invalid width for image or youtube widget, say -1, 
it will be automatically converted to the default 100%. 
Similarly, invalid sizes of header widgets like -1 and 10 will be converted to the default 1. 

## Required and optional input fields
When creating elements, I assume some input fields are required and others are optional. 
Required fields include: 
login: username, password
register: username, password, verify password
website-new: website name
page-new: page name

However, when updating elements, nothing is a required field, 
e.g. you can clear an existing username and update this profile, 
but you can never login again with the empty username.
This can be a clear bug or bad design, but since the sample codes didn't implement any fix, 
I'll assume it's not required on us, either.
Similar situations happen to website-edit, page-edit and widget-edit.

## Features not implemented
Here are some features that I didn't implement in this assignment. 
1. Editing or adding an HTML widget: it should be very similar with a Header widget.
2. Uploading an image from your laptop: you can still "choose file", but when you click "upload", 
your local file image won't actually appear on the website. The only working way is to fill in the url input field. 




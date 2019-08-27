# Software Engineer Exercise

# Overview

Here at ShootProof, we prefer to have a good idea of a candidate's technical
experience and analysis skills before proceeding with portions of our recruiting
process.  We believe that the exercise below will illustrate a candidate's
approach to working with technologies and methodologies that may be commonly
used in our [Táve](https://tave.com/) engineering team at ShootProof.

# Guidelines

* This exercise should not take you more than two hours to complete. If
  your solution is taking longer, that's okay—be honest and let us know how long
  it took and why you think it took that long.
* Be as thorough as you wish.
* All exercises are to be performed as if you were on the job.
* You may submit your response in one of the following ways:
  * Package an archive (ZIP, tarball, etc.) of your files and deliver it to
    your contact.
    * If working with a recruiter, deliver it to them.
    * If working with ShootProof directly, deliver to <careers+dev@shootproof.com>.
  * Fork our repository and open a pull request.

There are no right or wrong answers.  We are deliberately offering creative
freedom and interpretation to all candidates who are completing this exercise.
You would receive similar tasks on the job and would be given similar latitude
with how you approach the problem and deliver business insights.

# PHP & ReactJS Exercise

**Goal:** Create a persistent navigable tree component using our provided set of test data.

## Limitations

- KISS.
- Target only the latest Chrome.
  - Use the latest CSS and ES6+ JavaScript it supports.
- Don't use frameworks (e.g. Laravel, Twitter's Bootstrap, etc).
- Avoid third-party modules (such as jQuery, Redux, or others found on NPM, Bower, etc).

## Requirements

- Use this repository to kickstart your project.
- Using React Hooks, fetch the page settings and the node data from a PHP endpoint.
- Render the nodes using the selected theme and data to mimic the mockup below.
- When a parent node is collapsed or the theme is changed, call the PHP endpoint to update `testdata.json`.
- Use [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to provide two color schemes; a default light mode and a dark mode.
  - Enable dark mode by only changing CSS Variables when a class is added to the `body` element.

# Technical Requirements

- Only show the expander UI element for nodes that contain children.
- Only turn the cursor into a pointer for nodes with children.
- Click a node to expand or collapse it.
- Use a webfont (any font of your choice).
- Text and icons should be vertically centered within each tree node.
- Images should have data-driven alt text shown on hover.
- Changes to state will be saved when changed and displayed when the page is reloaded.

The end result should look something similar to what's shown below:

![Working Example of Tree Component](/docs/example.gif)

# Optional / Bonus
- Define a Yaml schema for your PHP endpoint.
- Limit cross-site request forgery.
- Make the node name editable.

# Instructions
- Fork or download this repository.
- Open a terminal and `cd` to the code's root directory.
  - Install the NPM modules using `npm i`.
  - Launch the Webpack dev server (with live reload support) using `npm run start`.
- Open a new terminal and `cd` to the code's root directory.
  - Launch PHP's built-in web server using `php -S localhost:8000 -t src/php/`
- Implement the project per the Requirements.
- If you're feeling adventurous, complete the Bonus tasks.
- Send the completed project to us per the Guidelines above.

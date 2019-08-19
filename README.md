# Software Engineer Exercise

# Overview

Here at ShootProof, we prefer to have a good idea of a candidate's technical
experience and analysis skills before proceeding with portions of our recruiting
process.  We believe that the exercise below will illustrate a candidate's
approach to working with technologies and methodologies that may be commonly
used in our data and analytics engineering team here at ShootProof.

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

# Back-end Exercise

Imagine that it's 2010, and ShootProof are starting to build our photo uploading
and processing functionality. This exercise walks you through what it might take
to design and build a very small portion of the ShootProof photo galleries
feature.


## Part 1: Data/domain modeling

**Goal:** define a data/domain model for photo galleries that contains albums
and photos.

Define a data model that:

* Allows a user to create a photo gallery.
* Allows the photo gallery to have photos uploaded into it.
* Allows the photo gallery to contain zero or more albums.
* Optionally allows a photo to be placed within one or more albums.

A complete submission will:

* Define all the relevant entities in the model.
* Illustrate the relationships and, optionally, behaviors among the entities.
* Describe the properties of each entity.
* Be documented in a manner you deem appropriate to accomplish the goal
  (entity-relationship diagram, UML, etc.).

## Part 2: Object-oriented programming

**Goal:** convert the data/domain model defined in Part 1 into working PHP
classes.

A complete submission will:

* Define all the relevant namespaces and classes as illustrated in your model.
* Include functionality to access and manipulate the data properties of each
  entity in the model.
* Expose the relationships among the entities through the use of code.

*Please note: Making database requests from these classes is not in the scope
of this exercise. Instead, focus on translating the domain into classes.*


# Front-end Exercise

Goal: Create a navigable tree component using our provided set of test data.

The test data is a flat structure with parent ID pointers. You may choose to use
the data structure as-is, or have a function transform the data structure into
some other structure, but treat the test data as a given.

- This exercise should not take you more than three hours to complete
- Feel free to make this component as cool/interesting as you'd like, as long
  as it meets the technical requirements
- You may use a JavaScript framework of your choice, or no framework &mdash;
  the choice is up to you
- However, you must not rely on a module or library that already provides a
  similar tree component
- Your solution should be coded with reusability in mind
- Submit a working set of code (ZIP, tarball, or link to JSFiddle, Plunker,
  GitHub pull request, etc.)
  - A working, compiled set of code in a single directory that can be opened in a browser
  - All source code

# Technical Requirements

- A complete submission will:
  - Only show the expander UI element for nodes that contain children
  - Only turn the cursor into a pointer for nodes with children
  - Click a node to expand it
  - Use of a webfont (any font of your choice)
  - Text and icons should be vertically centered within each tree node
  - Images should have data-driven alt text shown on hover

The end result should look something similar to what's shown below:

![Working Example of Tree Component](/example.gif)

# Test Data

You will find the test data in this repository under `testdata.json`. You can
copy it into your code directly, or use HTTP to get the content of that data
directly from GitHub if you prefer.

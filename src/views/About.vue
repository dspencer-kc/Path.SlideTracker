<template>
  <div class="abouttext">
      <h2>About Path Slide Tracker</h2>
      <br>
      <h4>Version 1.00 Notes</h4>
      <br>
      <div class="abouttextparagraph">
      <p>Path Slide Tracker is designed to be a tool to let pathologists know as soon as possible that slides are heading their way. 
         The idea is that as soon as Slide Distribution / Case Assembly determines where slides are going, to instantly update a
         dashboard that the pathologists can see. Essentially, to mark a slide ready for the couriers, Slide Distrubition will
          scan a slide tray, then scan slides that are put in that tray, and then assign them a location (either to a specific
          pathologist, or location like NKCH).  As soon as they scan that slide tray to a location, those slides will add to
          your count on your dashboard.
          </p>
          <p>
          In addition to this, we are working with Slide Distribution/Case Assembly to give them more tools to determine which location 
          is the best location to send slides at that time, and they will have more visibility of where slides have already been assigned to.
          </p>
          <p>
          This is version 1.00 and there is a list of known issues that are good for you to be aware of that is listed below.
          In addition to this, there is also a list of updates that are currently being worked on that should be rolled out soon.
          Your feedback was why this tool was created, and your continued feedback is much appreciated. Please send suggestions, 
          criticism, and feedback of this tool to dspencer@mawdpathology.com
          </p>
          <p>
            -Drew
            </p>
                
      <br>
      <h4>Notes:</h4>
      <ul>
        <li>All counts start from 0 and are increased whenever slides are assigned.  Because you have a 0 for a run, does not mean 
          you will not be getting any slides.  It means you have not been assigned any yet.</li>
      </ul>
      <br>
      <h4>Known Issues:</h4>
      <ul>
        <li>All counts start from 0 and will be</li>
        <li>Non Gyn Cytology Slides are Not Included</li>
        <li>You have to refresh the page to get the latest numbers (press f5 if you are on a PC) - See Future Updates</li>
        <li>If histotechs reprint a slide to get additonal levels instead of adding the slide in CoPath, these are not included in the count (being worked on)</li>
      </ul>
      <br>
      <h4>Future Updates:</h4>
      <ul>
        <li>Have the page AutoRefresh</li>
        <li>Give Slide Distribution option to input comments to pathologists, similiar to what is done on MAWD.com</li>
        <li>Case Inquery - Look up the stain statuses by putting in a case number</li>
        <li>Add courier tracking, so you know when the Slides leave MAWD, and which courier will be bringing them</li>
      </ul>
      <br>
</div>
    </div>
</template>

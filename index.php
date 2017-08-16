<!DOCTYPE html>
<html>
<title>Total Finance</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" href="css/charts.css" />
<link rel="stylesheet" type="text/css" href="css/w3pro.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/colors.css" />
<link rel="stylesheet" type="text/css" href="css/login.css" />

<body>

<!-- Navbar (sit on top) -->
<!--
  TBD: As window gets narrower, switch text in menu bar to icons so that it doesn't
  double in height & block other stuff - or other fix
-->
<div class="w3-top">
  <div class="w3-bar w3-white w3-card-2" id="myNavbar">
    <a href="#m_home" class="swap w3-bar-item w3-button w3-wide">TOTAL FINANCE!</a>
    <!-- Right-sided navbar links -->
    <div class="w3-right w3-hide-small">
      <a href="#m_settings" class="swap w3-bar-item w3-button" style="display: none" id="gotoSettings"><i class="fa fa-cog"></i><span> SETTINGS</span></a>
      <a href="#m_actual" class="swap w3-bar-item w3-button" id="gotoActual">ACTUAL</a>
      <a href="#m_budget" class="swap w3-bar-item w3-button" id="gotoBudget">BUDGET</a>
      <a href="#m_summary" class="swap w3-bar-item w3-button" id="gotoSummary">SUMMARY</a>
      <a href="#register" class="toLogin w3-bar-item w3-button">LOG IN/SIGN UP</a>
    </div>
    <!-- Hide right-floated links on small screens and replace them with a menu icon -->

    <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" id="menu_icon">
      <i class="fa fa-bars"></i>
    </a>
  </div>
</div>

<!-- Sidebar on small screens when clicking the menu icon -->
<nav class="w3-sidebar w3-bar-block w3-black w3-card-2 w3-animate-left w3-hide-medium w3-hide-large" style="display:none" id="mySidebar">
  <a href="javascript:void(0)" class="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  <a href="#m_settings" class="swap w3-bar-item w3-button"><i class="fa fa-cog"></i><span> SETTINGS</span></a>
  <a href="#m_actual" class="swap w3-bar-item w3-button">ACTUAL</a>
  <a href="#m_budget" class="swap w3-bar-item w3-button">BUDGET</a>
  <a href="#m_summary" class="swap w3-bar-item w3-button">SUMMARY</a>
  <a href="#register" class="toLogin w3-bar-item w3-button">LOG IN/SIGN UP</a>
</nav>

<!-- Header with full-height image -->
<header class="bgimg-1 w3-display-container w3-grayscale-min" id="m_home">
  <div class="w3-display-left w3-text-dark-grey" style="padding:48px">
    <span class="w3-jumbo w3-hide-small">Track your Finances</span><br>
    <span class="w3-xxlarge w3-hide-large w3-hide-medium">Track your Finances</span><br>
    <span class="w3-xlarge">and make your money go further</span>
<!--    TBD: I don't think href="#login" anywhere does anything
... cuz js references class .toLogin
...check before changing to href="#"-->
    <p><a href="#login" class="toLogin w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Log In or Sign Up</a></p>
  </div> 
  <div class="w3-display-bottomleft w3-text-grey w3-xxlarge" style="padding:24px 48px">
    <a target="_blank"  href="https://github.com/">
        <i class="fa fa-github w3-hover-opacity"></i>
    </a>
    <a target="_blank" href="https://twitter.com/?lang=en">
      <i class="fa fa-twitter w3-hover-opacity"></i>
    </a>
  </div>
</header>

<!-- Modal: Log In/Sign Up -->
<div id="register" class="w3-modal">
  <div class="w3-modal-content form">
    <span class="w3-button w3-display-topright">&times;</span>
    
    <!--    Register-->
    <form class="register-form">
<!--    <div class="register-form">-->
      <input id="name_set" type="text" placeholder="Name"/>
      <input id="email_set" type="text" placeholder="Email address"/>
      <button type="button" class="w3-button w3-black" id="signup_now">Sign up</button>
      <p id="gotoLogin" class="message">Already registered? <a href="#login">Log In</a></p>
<!--    </div>-->
    </form>
    
    <!--    Log in-->
    <form class="login-form">
<!--    <div class="login-form">-->
      <input id="email" type="text" placeholder="Email"/>
      <input id="password" type="password" placeholder="Password"/>
      <button type="button" class="w3-button w3-black" id="login_now">login</button>
      <p id="gotoSignin" class="message">Not registered? <a href="#login">Sign up now</a></p>
      <p id="requestPasswordReset" class="message">Forgot password? <a href="#login">Reset password</a></p>
<!--    </div>-->
    </form>
  </div>
</div>  

<!-- Modal: prompt user for email, in order to send reset pw link -->
<!--
  TBD: might be better to incorporate within the <div id="register"... section above - 
  but not sure since we may also have this option in user settings
-->
<div id="getEmail" class="w3-modal">
  <div class="w3-modal-content form">
    <span class="w3-button w3-display-topright">&times;</span>
    
    <!--    Get email-->
    <form class="login-form">
      <p class="message">Please provide the email address you used to register with Total Finance. We'll send you an activation link so you can set a new password.</p>
      <input id="email_ver" type="text" placeholder="Email"/>
      <button type="button" class="w3-button w3-black" id="reqNewPW_now">submit</button>
    </form>
  </div>
</div>  

  
<!-- Modal: prompt user for new password -->
<div id="password_prompt" class="w3-modal">
  <div class="w3-modal-content form">
    <span class="w3-button w3-display-topright">&times;</span>
    
    <!--    Get & confirm password -->
    <form class="password-form">
      <input id="password1" type="password" placeholder="Password"/>
      <input id="password2" type="password" placeholder="Confirm password"/>
      <button type="button" class="w3-button w3-black" id="password_set">CREATE PASSWORD</button>
    </form>
    
  </div>
</div>  

  
<!-- User Message Section -->
<div id="userMsg" class="w3-modal">
  <div class="w3-modal-content form">
    <span class="w3-button w3-display-topright">&times;</span>

    <p></p>
    <button type="button" class="w3-button w3-black" id="close_msg">close</button>
  </div>
</div>  

  
<!-- Actual Section -->
<!-- TBD: Add template to make this dynamic for all categories-->
<!--  TBD: Actual & Budgeted Expenses may be similar enough to just use one template-->
<!--<div class="results w3-row-padding w3-text-indigo w3-grey" style="padding:64px 16px" id="m_actual">-->
<div class="results actual w3-row-padding w3-text-indigo w3-grey" id="m_actual">
  <div class="w3-card w3-light-grey">
      <div class="subMenu w3-bar w3-indigo w3-card-2">
        <div class="w3-center" id="s_actual">
          <a href="#" class="w3-bar-item w3-button">Household</a>
          <a href="#" class="w3-bar-item w3-button">Car/Transit</a>
          <a href="#" class="w3-bar-item w3-button">Food</a>
          <a href="#" class="w3-bar-item w3-button">Health</a>
          <a href="#" class="w3-bar-item w3-button">Utilities</a>
          <a href="#" class="w3-bar-item w3-button">Clothing/Pers</a>
          <a href="#" class="w3-bar-item w3-button">Charity</a>
          <a href="#" class="w3-bar-item w3-button">Leisure</a>
          <a href="#" class="w3-bar-item w3-button">Taxes</a>
          <a href="#" class="w3-bar-item w3-button">Accounts</a>
          <a href="#" class="w3-bar-item w3-button">Misc</a>
        </div>
      </div>
<!--    </div>-->
    <form action="">
      <div class="w3-container w3-hide-small">
<!--
        <div class="dateSel">
          <p>Show actual expenses for:</p>
          <select id="date_actual">
-->
<!--        completed by template-->
<!--
          </select>
        </div>
-->

<!--
        Note: The table headers are outside
        of scroll div because the headers scroll out of view
        when they are included. The tradeoff is that when
        screen size is very small, headers are not aligned with data very well.
        It might work to drop the horiz scroll bar and hide overflow?
-->
        <table class="w3-text-indigo">
          <thead>
            <tr>
              <th colspan="1">Item</th>
              <th colspan="1">History for:<br>
                <select id="date_actual">
      <!--        completed by template-->
                </select>
              </th>
              <th colspan="1">Actual<br>Amount</th>
              <th colspan="1">Details</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="w3-center scrollit_y w3-hide-small categ" id="list_actual">
<!--          template used here -->
      </div>
        
      <div id="input_actual" class="entry w3-row-padding">
        <div class="w3-quarter">        

          <p>Add actual expense:</p>
          <select>
<!--          template used here -->
          </select>
        </div>

        <div class="w3-quarter">        
          <p>Date:</p><input class="w3-input w3-border dateOpt" type="date">
        </div>

        <div class="w3-quarter">        
          <p><span>Actual</span> amount:</p>
          <input id="amt_actual" class="w3-input w3-border" type="number" min="0" step=".01" placeholder="0.00">
        </div>

        <div class="w3-quarter">        
          <p>Details:</p>
          <input id="det_actual" class="w3-input w3-border" type="text" placeholder="optional...">
        </div>
      </div>        
      
      <p class="w3-center">
        <button class="w3-button w3-black" type="submit" name="actual">SAVE ACTUAL EXPENSE</button>
      </p>
    </form>
    
    <div class="w3-container w3-indigo w3-large" style="height: 2em"></div>
  </div>
</div>

  
<!-- Budget Section -->
<!-- template will make the category dynamic...-->
<div class="results budget w3-row-padding w3-text-teal w3-grey" id="m_budget">
  <div class="w3-card w3-light-grey">

    <div class="subMenu w3-bar w3-teal w3-card-2">
        <div class="w3-center" id="s_budget">
<!--          could add template for this-->
          <a href="#" class="w3-bar-item w3-button">Household</a>
          <a href="#" class="w3-bar-item w3-button">Car/Transit</a>
          <a href="#" class="w3-bar-item w3-button">Food</a>
          <a href="#" class="w3-bar-item w3-button">Health</a>
          <a href="#" class="w3-bar-item w3-button">Utilities</a>
          <a href="#" class="w3-bar-item w3-button">Clothing/Pers</a>
          <a href="#" class="w3-bar-item w3-button">Charity</a>
          <a href="#" class="w3-bar-item w3-button">Leisure</a>
          <a href="#" class="w3-bar-item w3-button">Taxes</a>
          <a href="#" class="w3-bar-item w3-button">Accounts</a>
          <a href="#" class="w3-bar-item w3-button">Misc</a>
        </div>
      </div>
    
    <form action="">
      <div class="w3-container w3-hide-small">
<!--
        <div class="dateSel">
          <p>Show budgeted expenses for:</p>
          <select id="date_budget">
-->
<!--        completed by template-->
<!--
          </select>
        </div>
-->

<!--
        Note: The reason the table headers are outside
        of scroll div is that the headers scroll out of view
        when they are included.
-->
        <table class="w3-text-teal">
          <thead>
            <tr>
              <th colspan="1">Item</th>
              <th colspan="1">History for:<br>
                <select id="date_budget">
      <!--        completed by template-->
                </select>
              </th>
              <th colspan="1">Budgeted<br>Amount</th>
              <th colspan="1">Details</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="w3-center scrollit_y w3-hide-small categ" id="list_budget">
<!--        template used here-->
      </div>
        
      <div id="input_budget" class="entry w3-row-padding">
        <div class="w3-quarter">        

          <p>Add budget expense:</p>
          <select>
<!--          template used here -->
          </select>
        </div>

        <div class="w3-quarter">        
          <p>Date:</p><input class="w3-input w3-border dateOpt" type="date">
        </div>

        <div class="w3-quarter">        
          <p><span>Budgeted</span> amount:</p>
          <input id="amt_budget" class="w3-input w3-border" type="number" min="0" step=".01" placeholder="0.00">
        </div>

        <div class="w3-quarter">        
          <p>Details:</p>
          <input id="det_budget" class="w3-input w3-border" type="text" placeholder="optional...">
        </div>
      </div>        
      
      <p class="w3-center">
        <button class="w3-button w3-black" type="submit" name="budget">SAVE BUDGETED EXPENSE</button>
      </p>
    </form>
    
    <div class="w3-container w3-teal w3-large" style="height: 2em"></div>
  </div>
</div>
  

<!-- Summary Section -->
<!-- TBD: Add template to make this dynamic-->
<div class="summary w3-row-padding w3-text-blue-gray w3-grey" id="m_summary">
  <div class="w3-card w3-light-grey">
      <div class="subMenu w3-bar w3-blue-gray w3-card-2">
        <div class="w3-center" id="s_summary">
<!--          could add template for this-->
          <a href="#" class="w3-bar-item w3-button">Household</a>
          <a href="#" class="w3-bar-item w3-button">Car/Transit</a>
          <a href="#" class="w3-bar-item w3-button">Food</a>
          <a href="#" class="w3-bar-item w3-button">Health</a>
          <a href="#" class="w3-bar-item w3-button">Utilities</a>
          <a href="#" class="w3-bar-item w3-button">Clothing/Pers</a>
          <a href="#" class="w3-bar-item w3-button">Charity</a>
          <a href="#" class="w3-bar-item w3-button">Leisure</a>
          <a href="#" class="w3-bar-item w3-button">Taxes</a>
          <a href="#" class="w3-bar-item w3-button">Accounts</a>
          <a href="#" class="w3-bar-item w3-button">Misc</a>
        </div>
      </div>
    
    
        <div class="dateSel">
          <p>Show summary for:</p>
          <select id="date_summary">

<!--        completed by template-->
          </select>
        </div>
    
        <!--  put chart elements here -->  
<!--        TBD: need to make responsive-->

        <p> Bar chart needs (hovering?) data labels.  Needs centering, etc. Ideally needs responsive sizing.</p>
        <div class="cBar">
          <svg width="960" height="400"></svg>
        </div>

        <p> Pie chart needs data labels.  Needs centering, etc. Ideally needs responsive sizing.</p>
        <div class="cPie">
          <svg width="700" height="300">
            <g id="actualDonut"></g>
            <g id="budgetDonut"></g>
          </svg>
        </div>
    <div class="w3-container w3-blue-gray w3-large" style="height: 2em"></div>
  </div>
</div>
  


  

  
  
<!-- Settings Section -->  
<div class="settings w3-row-padding w3-text-blue-gray w3-grey" id="m_settings">
  <div class="w3-card w3-light-grey">
    <div class="w3-container w3-blue-gray">
      <h5 class="w3-center">USER SETTINGS</h5>
    </div>
    <form action="">
      <div class="w3-container w3-border-top">
      
        <!-- Preferences, part 1 -->
        <div class="w3-half w3-margin-bottom" style="padding:16px 16px">
          <h3 class="w3-center">User Preferences</h3>
            <p><input class="w3-input w3-border" type="text" placeholder="stuff"></p>
            <p><input class="w3-input w3-border" type="email" placeholder="stuff"></p>
            <p><input class="w3-input w3-border" type="password" placeholder="stuff"></p>
            <p><input class="w3-input w3-border" type="password" placeholder="stuff"></p>
        </div>

        <!-- Preferences, part 2 -->
        <div class="w3-half w3-margin-bottom snug" style="padding:16px 16px">
          <h3 class="w3-center">More Preferences</h3>
            <h4>Sample radio button:</h4>
            <p>
              <input type="radio" name="pay_per" id="hourly"><span>Hourly&nbsp;&nbsp;&nbsp;</span>
              <input type="radio" name="pay_per" id="weekly"><span>Weekly&nbsp;&nbsp;&nbsp;</span>
              <input type="radio" name="pay_per" id="monthly"><span>Monthly&nbsp;&nbsp;&nbsp;</span>
              <input type="radio" name="pay_per" id="yearly"><span>Yearly&nbsp;&nbsp;&nbsp;</span>
            </p>
            <h4>Sample drop-down:</h4>
            <select name="state" id="state">
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">and so on...</option>
            </select>				
			
            <h4>Sample numeric input:</h4>
            <p><input class="w3-input w3-border" type="number" min="0" name="junk1" id="junk1"></p>
            <h4>Sample text input:</h4>
            <p><input class="w3-input w3-border" type="text" placeholder="Comment goes here..." min="0" name="junk1" id="junk1"></p>
        </div>
      </div>
      
      <p class="w3-center">
        <button class="w3-button w3-black" type="submit">SAVE USER SETTINGS</button>
      </p>
    </form>

    <div class="w3-container w3-blue-gray w3-large" style="height: 2em"></div>
  </div>
</div>

<!-- About Section -->
<!--  TBD: Change some of the grey text to colors - think grayscale needs adjustment-->
<div class="w3-container w3-dark-gray" style="padding:64px 16px" id="about">
  <h3 class="w3-center">ABOUT (app name...)</h3>
  <p class="w3-center w3-large">A message here about the app...</p>
  <br>
  <h3 class="w3-center">DEVELOPERS</h3>
  <div class="w3-row-padding w3-grayscale" style="margin-top:32px">
    <div class="w3-col w3-third w3-margin-bottom">
      <div class="w3-card-2">
        <div class="w3-container w3-white">
          <h3 class="w3-text-indigo">Daniel Clough</h3>
          <p class="w3-opacity">Web Developer</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
           <div class="w3-text-grey w3-xxlarge w3-center">
            <a target="_blank"  href="#">
              <i class="fa fa-github w3-hover-opacity"></i>
            </a>
            <a target="_blank" href="https://github.com/">
              <i class="fa fa-linkedin w3-hover-opacity"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="w3-col w3-third w3-margin-bottom">
      <div class="w3-card-2">
        <div class="w3-container w3-white">
          <h3 class="w3-text-indigo">Michael Park</h3>
          <p class="w3-opacity">Web Developer</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
          <div class="w3-text-grey w3-xxlarge w3-center">
            <a target="_blank"  href="https://github.com/">
              <i class="fa fa-github w3-hover-opacity"></i>
            </a>
            <a target="_blank" href="#">
              <i class="fa fa-linkedin w3-hover-opacity"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="w3-col w3-third w3-margin-bottom">
      <div class="w3-card-2">
        <div class="w3-container w3-white">
          <h3 class="w3-text-indigo">Diane Zevenbergen</h3>
          <p class="w3-opacity">Web Developer</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
          <div class="w3-text-grey w3-xxlarge w3-center">
            <a target="_blank"  href="https://github.com/dianezev/mathfacts">
              <i class="fa fa-github w3-hover-opacity"></i>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/dianezev">
              <i class="fa fa-linkedin w3-hover-opacity"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
<!-- Footer -->
<footer class="w3-center w3-black w3-padding-64">
  <a href="#m_home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
  <div class="w3-xxlarge w3-section">
    <a target="_blank"  href="https://github.com/">
      <i class="fa fa-github w3-hover-opacity"></i>
    </a>
    <a target="_blank" href="https://twitter.com/?lang=en">
      <i class="fa fa-twitter w3-hover-opacity"></i>
    </a>
  </div>
</footer>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  
<!--  note this is the chart script that works with chart01.js-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>

<!--  note this is the chart script that works with chart03.js and chart04.js-->
<!--<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js'></script>-->
  
<script src="js/helpers/getAllUrlParams.js"></script>

<!--this ref is temporary, until JSON data returned by php-->
<script type="text/javascript" src="js/model/testData.json"></script>
  
<!--  this is current version V4; don't use templates based on V3 due to conflicts-->
<script src="js/d3.min.js"></script>

  
<script src="js/templates/template.js"></script>
<script src="js/model/model.js"></script>
<script src="js/model/constants.js"></script>
<script src="js/view/view.js"></script>
<script src="js/view/chartBar.js"></script>
<script src="js/view/donut3D.js"></script>
<script src="js/controller/controller.js"></script>
<script src="js/script.js"></script>
<script src="js/events/events.js"></script>
  
  
  
<!--  <script src="js/charts/chartD3_01.js"></script>-->
<!--  <script src="js/charts/chart03.js"></script>-->
<!--  <script src="js/charts/chart04.js"></script>-->
  
</body>
</html>

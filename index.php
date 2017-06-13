<!DOCTYPE html>
<html>
<title>Total Finance</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" href="css/w3pro.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/colors.css" />
<link rel="stylesheet" type="text/css" href="css/login.css" />

<body>

<!-- Navbar (sit on top) -->
<div class="w3-top">
  <div class="w3-bar w3-white w3-card-2" id="myNavbar">
    <a href="#m_home" class="swap w3-bar-item w3-button w3-wide">APP NAME</a>
    <!-- Right-sided navbar links -->
    <div class="w3-right w3-hide-small">
      <a href="#login" class="toLogin w3-bar-item w3-button">LOG IN/SIGN UP</a>
      <a href="#m_expenses" class="swap w3-bar-item w3-button">EXPENSES</a>
      <a href="#m_budget" class="swap w3-bar-item w3-button">BUDGET</a>
      <a href="#m_settings" class="swap w3-bar-item w3-button" style="display: none">
	      <i class="fa fa-cog"></i><span> SETTINGS</span></a>
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
  <a href="#login" class="toLogin w3-bar-item w3-button">LOG IN/SIGN UP</a>
  <a href="#m_expenses" class="swap w3-bar-item w3-button">EXPENSES</a>
  <a href="#m_budget" class="swap w3-bar-item w3-button">BUDGET</a>
  <a href="#m_settings" class="swap w3-bar-item w3-button"><i class="fa fa-cog"></i><span> SETTINGS</span></a>
</nav>

<!-- Header with full-height image -->
<header class="bgimg-1 w3-display-container w3-grayscale-min" id="m_home">
  <div class="w3-display-left w3-text-dark-grey" style="padding:48px">
    <span class="w3-jumbo w3-hide-small">Track your Finances</span><br>
    <span class="w3-xxlarge w3-hide-large w3-hide-medium">Track your Finances</span><br>
    <span class="w3-xlarge">and make your money go further</span>
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

<!-- Log In/Sign Up Section -->
<div id="login" class="w3-modal">
  <div class="w3-modal-content form">
    <span class="w3-button w3-display-topright">&times;</span>
	  <!-- REGISTER -->
    <form class="register-form" action="signup.php" method="POST">
      <input id="name_set" type="text" name="registerName" placeholder="Name"/>
      <input id="password_set" type="password" name="registerPW" placeholder="Password"/>
      <input id="email_set" type="text" name="registerEmail" placeholder="Email address"/>
      <button type="button" class="w3-button w3-black" id="signin_first">create</button>
      <p class="message">Already registered? <a href="#login">Sign In</a></p>
    </form>
	  <!-- LOGIN -->
    <form class="login-form" action="login.php" method="POST">
      <input id="email" type="text" name="loginEmail" placeholder="Email"/>
      <input id="password" type="password" name="loginPW" placeholder="Password"/>
      <button type="button" class="w3-button w3-black" id="signin_return">login</button>
      <p class="message">Not registered? <a href="#login">Create an account</a></p>
    </form>
  </div>
</div>  

<!-- Expenses Section -->
<!-- TBD: Add template to make this dynamic for all expense categories-->
<!--  TBD: Expenses & Budget may be similar enough to just use one template-->
<div class="results w3-row-padding w3-text-indigo w3-grey" style="padding:128px 16px" id="m_expenses">
  <div class="w3-card w3-light-grey">
    <div class="w3-container w3-indigo">
      <!-- template will make the category dynamic...-->
      <h3 class="w3-center">HOUSEHOLD EXPENSES</h3>
    </div>
<!--    <div class="w3-container">-->
<!--      <div class="w3-top">-->
      <div class="subMenu w3-bar w3-white w3-card-2" id="navCateg">
        <div class="w3-center">
          <a href="#" class="w3-bar-item w3-button">Household</a>
          <a href="#" class="w3-bar-item w3-button">Car/Bus</a>
          <a href="#" class="w3-bar-item w3-button">Food</a>
          <a href="#" class="w3-bar-item w3-button">Health</a>
          <a href="#" class="w3-bar-item w3-button">Utilities</a>
          <a href="#" class="w3-bar-item w3-button">Childcare</a>
          <a href="#" class="w3-bar-item w3-button">Educ/Prof</a>
          <a href="#" class="w3-bar-item w3-button">Clothing/Pers</a>
          <a href="#" class="w3-bar-item w3-button">Charity</a>
          <a href="#" class="w3-bar-item w3-button">Fun/Travel</a>
          <a href="#" class="w3-bar-item w3-button">Gifts</a>
          <a href="#" class="w3-bar-item w3-button">Taxes</a>
          <a href="#" class="w3-bar-item w3-button">Accounts</a>
          <a href="#" class="w3-bar-item w3-button">Misc</a>
        </div>
      </div>
<!--    </div>-->
    <form action="" target="_blank">
      <div class="w3-container w3-hide-small" style="margin-top:32px">

<!--
        Note: The reason the table headers are outside
        of scroll div is that the headers scroll out of view
        when they are included. The tradeoff is that when
        screen size is very small, headers are not aligned with data.
        It might work to drop the horiz scroll bar and hide overflow?
-->
        <table>
          <thead>
            <tr>
              <th colspan="1">Household Expenses</th>
              <th colspan="1">Date</th>
              <th colspan="1">Amount</th>
              <th colspan="1">Details</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="w3-center scrollit w3-hide-small">
        <table>
          <tbody class="addColor" id="qryResults">

            <!--TBD: Use JS & template to populate this -->
            <!-- Also add jquery to scroll to bottom
            so that user can see most recent entries: $('#qryResults').scrollTop(d.prop("scrollHeight"))
            so that user sees their last entry -->
            <tr>
              <td>Mortgage payment</td>
              <td>01/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>02/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Maintenance/Repairs</td>
              <td>02/11/2017</td>
              <td>$35.56</td>
              <td>New faucet</td>
            </tr>

            <tr>
              <td>Mortgage payment</td>
              <td>03/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>04/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Home improvement</td>
              <td>04/11/2017</td>
              <td>$425.12</td>
              <td>Tile backsplash</td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>01/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>02/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Maintenance/Repairs</td>
              <td>02/11/2017</td>
              <td>$35.56</td>
              <td>New faucet</td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>01/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>02/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Maintenance/Repairs</td>
              <td>02/11/2017</td>
              <td>$35.56</td>
              <td>New faucet</td>
            </tr>

          </tbody>
        </table>
      </div>
        
      <div class="entry w3-row-padding">
        <div class="w3-quarter">        

          <p>Add a household expense:</p>
          <select name="hshld" id="subCat">
            <option value="HS_01">Rent/Mortgage payment</option>
            <option value="HS_02">Maintenance/Repairs</option>
            <option value="HS_03">Renters/Homeowners insurance</option>
            <option value="HS_04">Household goods/Furniture</option>
            <option value="HS_05">Home improvement</option>
            <option value="HS_06">Yard care</option>
            <option value="HS_07">Other</option>
          </select>
        </div>

        <div class="w3-half">        

          <div class="w3-third">        
            <p>Date:</p><input class="dateOpt" type="date">
          </div>

          <div class="w3-third">        
            <p>Amount:</p>
            <p><input class="w3-input w3-border" type="number" min="0" id="exp_amt"></p>
          </div>
          <div class="w3-third">        
            <p>Recurring:</p>
            <select name="housing" id="subCat">
              <option value="rec_01">No</option>
<!--              TBD: Make text here dynamic depending on date selected-->
              <option value="rec_02">Monthly, through 12/2017</option>
            </select>
          </div>

        </div>

        <div class="w3-quarter">        
          <p>Details:</p>
          <p><input class="w3-input w3-border" type="text" placeholder="optional..." id="exp_amt"></p>
        </div>
      </div>        
      
      <p class="w3-center">
        <button class="w3-button w3-black" type="submit">SAVE HOUSEHOLD EXPENSES</button>
      </p>
    </form>
    
    <div class="w3-container w3-indigo w3-large" style="height: 2em"></div>
  </div>
</div>

  
<!-- Budget Section -->
<!-- template will make the category dynamic...-->
<div class="results w3-row-padding w3-text-teal w3-grey" style="padding:128px 16px" id="m_budget">
  <div class="w3-card w3-light-grey">
    <div class="w3-container w3-teal">
      <!-- template will make the category dynamic...-->
      <h3 class="w3-center">HOUSEHOLD BUDGET</h3>
    </div>
      <div class="subMenu w3-bar w3-white w3-card-2" id="navCateg">
        <div class="w3-center">
          <a href="#" class="w3-bar-item w3-button">Household</a>
          <a href="#" class="w3-bar-item w3-button">Car/Bus</a>
          <a href="#" class="w3-bar-item w3-button">Food</a>
          <a href="#" class="w3-bar-item w3-button">Health</a>
          <a href="#" class="w3-bar-item w3-button">Utilities</a>
          <a href="#" class="w3-bar-item w3-button">Childcare</a>
          <a href="#" class="w3-bar-item w3-button">Educ/Prof</a>
          <a href="#" class="w3-bar-item w3-button">Clothing/Pers</a>
          <a href="#" class="w3-bar-item w3-button">Charity</a>
          <a href="#" class="w3-bar-item w3-button">Fun/Travel</a>
          <a href="#" class="w3-bar-item w3-button">Gifts</a>
          <a href="#" class="w3-bar-item w3-button">Taxes</a>
          <a href="#" class="w3-bar-item w3-button">Accounts</a>
          <a href="#" class="w3-bar-item w3-button">Misc</a>
        </div>
      </div>
    <form action="" target="_blank">
      <div class="w3-container w3-hide-small" style="margin-top:32px">

<!--
        Note: The reason the table headers are outside
        of scroll div is that the headers scroll out of view
        when they are included.
-->
        <table>
          <thead>
            <tr>
              <th colspan="1">Household Budget</th>
              <th colspan="1">Date</th>
              <th colspan="1">Amount</th>
              <th colspan="1">Details</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="w3-center scrollit w3-hide-small">
        <table>
          <tbody class="addColor" id="qryResults">

            <!--TBD: Use JS & template to populate this -->
            <!-- Also add jquery to scroll to bottom
            so that user can see most recent entries: $('#qryResults').scrollTop(d.prop("scrollHeight"))
            so that user sees their last entry -->
            <tr>
              <td>Mortgage payment</td>
              <td>01/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Maintenance/Repairs</td>
              <td>02/01/2017</td>
              <td>$75.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>02/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Maintenance/Repairs</td>
              <td>02/01/2017</td>
              <td>$75.00</td>
              <td></td>
            </tr>

            <tr>
              <td>Other</td>
              <td>03/01/2017</td>
              <td>$300.00</td>
              <td>New trees</td>
            </tr>
            <tr>
              <td>Mortgage payment</td>
              <td>04/01/2017</td>
              <td>$1,200.00</td>
              <td></td>
            </tr>
            <tr>
              <td>Home improvement</td>
              <td>05/01/2017</td>
              <td>$500</td>
              <td>Summer project</td>
            </tr>
          </tbody>
        </table>
      </div>
        
      <div class="entry w3-row-padding">
        <div class="w3-quarter">        

          <p>Add a budget item:</p>
          <select name="hshld" id="subCat">
            <option value="HS_01">Rent/Mortgage payment</option>
            <option value="HS_02">Maintenance/Repairs</option>
            <option value="HS_03">Renters/Homeowners insurance</option>
            <option value="HS_04">Household goods/Furniture</option>
            <option value="HS_05">Home improvement</option>
            <option value="HS_06">Yard care</option>
            <option value="HS_07">Other</option>
          </select>
        </div>

        <div class="w3-half">        

          <div class="w3-third">        
            <p>Date:</p><input class="dateOpt" type="date">
          </div>

          <div class="w3-third">        
            <p>Amount:</p>
            <p><input class="w3-input w3-border" type="number" min="0" id="exp_amt"></p>
          </div>
          <div class="w3-third">        
            <p>Recurring:</p>
            <select name="housing" id="subCat">
              <option value="rec_01">No</option>
<!--              TBD: Make text here dynamic depending on date selected-->
              <option value="rec_02">Monthly, through 12/2017</option>
            </select>
          </div>

        </div>

        <div class="w3-quarter">        
          <p>Details:</p>
          <p><input class="w3-input w3-border" type="text" placeholder="optional..." id="exp_amt"></p>
        </div>
      </div>        
      
      <p class="w3-center">
        <button class="w3-button w3-black" type="submit">SAVE HOUSEHOLD BUDGET</button>
      </p>
    </form>
    
    <div class="w3-container w3-teal w3-large" style="height: 2em"></div>
  </div>
</div>
  

  
<!-- Settings Section -->
<div class="w3-row-padding w3-text-teal w3-grey" style="padding:128px 16px" id="m_settings">
  <div class="w3-card w3-light-grey">
    <div class="w3-container w3-deep-orange">
      <h3 class="w3-center">USER SETTINGS</h3>
    </div>
    <form action="" target="_blank">
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
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
              <option value="AS">American Samoa</option>
              <option value="GU">Guam</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="PR">Puerto Rico</option>
              <option value="UM">United States Minor Outlying Islands</option>
              <option value="VI">Virgin Islands</option>
              <option value="AA">Armed Forces Americas</option>
              <option value="AP">Armed Forces Pacific</option>
              <option value="AE">Armed Forces Others</option>		
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

    <div class="w3-container w3-deep-orange w3-large" style="height: 2em"></div>
  </div>
</div>

<!-- About Section -->
<!--  TBD: Change some of the grey text to colors - think grayscale needs adjustment-->
<div class="w3-container w3-dark-gray" style="padding:128px 16px" id="about">
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
  <a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
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
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/model/model.js"></script>
<script src="js/view/view.js"></script>
<script src="js/controller/controller.js"></script>
<script src="js/script.js"></script>
<script src="js/events/events.js"></script>

  
</body>
</html>

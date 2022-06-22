# Death Penalty Project (Singapore)
Access live demo site [here](https://deathpenaltyproject.netlify.app/)  
Landing page
![Devices mockup for index page](/readme/devices-mockup-landing.png "Index page mockup")  
Dashboard page
![Devices mockup for dashboard](/readme/devices-mockup-dashboard.png "Dashboard mockup")

---

## Overview

This project is created as a website for a fictional Singaporean branch of [The Death Penalty Project](https://deathpenaltyproject.org), an existing organisation which advocates for abolishing capital punishment. 

In early 2022, the case of Nagaenthran K Dharmalingh, a drug trafficker who appealed his death sentence on grounds of his intellectual disability gained traction on social media. This sparked interested and discussion on this topic within Singapore. A website which provides further information on drug abuse in Singapore, and briefly introduces the case against using capital punishment against these offences therefore may capitalise on the interest on this area and draw in more supporters for this cause. 

### Organization's Goals
The primary goal is to persuade site visitors to oppose capital punishment in Singapore for drug related offences and to question its supposed deterrent effect. 

The organisation also aims to encourage users to support their cause through signing up for a mailing list or donating. 

### Users' Goals
General public users should be able to learn more about the relationship between drug abuse and the death penalty in Singapore. They should also be directed to ways to support the organisation. 

---

## 5 Planes of UI/UX

### Strategy

1. **Organisation**
   - Primary Objective: To raise awareness of Singapore's use of the death penalty and encourage opposition towards this policy. 
   - Secondary Objective: To gain supporters of the organisation through mailing list sign ups or donations.
2. **Users: General Public**
    - Objective: Learn more about the relationship between drug abuse and the death penalty
    - Needs:
        - Easily access required data sets
        - Brief summary of key points/trends of interest
        - Manipulate data set filters easily to draw own conclusions
    - Demographics:
        - Anyone interested in issues of social justice 
        - Anyone looking for information on this topic
    - Pain point: 
        - Problems of drug abuse is often not discussed publicly and factual statistics are not known as general knowledge. Most average citizen's understandings rely on qualitative impressions. 
        - Accessing government-collected data through data.gov is inconvenient and troublesome for the average user. 

3. **Users: Activists/Higher Interest Parties** 
    - Objective: Contribute to supporting the organisations cause
    - Needs:
        - Direction towards how to donate or support the organisation
        - Method to keep up to date with the organisation's activities
    - Demographics:
        - Adults
        - Individuals with passion for social justice/high levels of empathy for the project

User Stories | Acceptance Criteria(s)
------------ | -------------
As an interested citizen, I would like to understand the reasons to oppose the death penalty | Charts should be accompanied with brief summary of pertinent datapoints or trends that support the organisations argument.
As an interested citizen, I would like to observe and manipulate the data shown personally to validate claims made by the organisation | Charts should have means to filter year range and relevant categories to allow users to validate points made and draw their own conclusions. <br> Related charts should also update synchronously with filters for ease of visualisation. 
As an activist, I would like to remain updated of the organisations activities | Site should direct to social media and have the option signing up to a mailing-list
As an activist, I would like to fund/support the organisation's activities | Site should direct users to donate 

### Scope

#### *Content*
- Data visualisation: Charts
    - Execution figures since 2007
    - Drug abuser demographics
    - Drug rehabilitation center statistics
- Copy
    - Text accompanying data visualisation to direct users attention to key points and trends that can be observed in the charts

#### *Functional*
- Filter and update data from different year range
- Filter and update data from relevant categories
- Remove or focus on specific series of data 

#### *Non-functional*
- Mobile responsiveness: charts can be displayed comfortably across different view ports
- Performance

### Structure
![Website architecture](/readme/system-architecture.jpg "Site architecture")

1. Loading of the site will bring user to a landing page introducing the gravity of capital punishment in Singapore through a static graph visualising executions in the past 15 years. 
2. Scrolling down leads to a brief summary of the case against the death penalty and directs users to either learn more, or see stories from people who have been on death row. 
3. Learn more page leads to dashboard of interactive charts accompanied by explanatory captions to highlight key trends users can observe through the charts. 
    - All charts include year range filter. Adjusting range of one chart will update range for all related charts
    - Some charts also include category filters to visualise data through relevant available demographic breakdowns(age, education, etc)
4. All pages include fixed Navbar with call-to-action button for people to donate to the organisation, and footer that includes mailing list sign up and links to the organisations social medias. 

### Skeleton
Earlier website draft plans:
![Skeleton for landing page interface](/readme/landing-page-skeleton.jpg)
![Skeleton for dashboard interface](/readme/dashboard-skeleton.jpg)

### Surface

#### *Color Scheme*
- As the topic is very serious, most of the site is dark and monochrome to reflect the gravity of the topic and reflect a more mature feel. 
- A deep, less saturated red was chosen to compliment the darker tones of the site. 

#### *Font*
- Headers: Neuton
    - Serif font to give a more refined and authoritative impression.  
- Body paragraphs: Cantarell
    - Sans serif font for better readability of longer strings to text
    - Character spacing and line heights were adjusted for different elements to increase visual interest while keeping the font itself consistent for better cohesiveness. 

#### *Icons*
Font awesome icons are used for shorthand representing social media links. 

---

## Testing
View test cases [here](https://github.com/clyerica/tgc-project1-death-penalty-project/blob/main/readme/test-cases.pdf)

---

## Possible Enhancements

- Our Stories Page
    - Due to time constraints, the page introducing more of the work The Death Penalty Project does helping to appeal death sentences and lobbying for the abolishment of capital punishment was not implemented. 
    - Adding this page can contribute a more 'human' aspect and appeal more towards emotions over the logical appeal from the dashboard page. 
- Donations Page
    - Ideally the link should lead to a page allowing users to directly donate online to the organisation.
    - This was not implemented due to time and technical constraints.

---

## Challenges and Constraints

1. Data for the charts was downloaded from data.gov as a CSV file, hence in the future the information in graphs will become outdated without manual updating.
2. Adding on, if the data-presentation format in the CSV files changes in the future or additional info is collected by the government, this may require updates to the data-processing procedures coded. 

---

## Libraries and Sources

### Technologies Used

1. [Bootstrap](https://www.cirrus-ui.com/) for base template and CSS library for the UI
2. [Bootstrap Icons](https://icons.getbootstrap.com) for icons used to link social media
3. [Google Font](https://fonts.google.com/) for the fonts used 
4. [AXIOS](https://axios-http.com/docs/intro) for AJAX requests
5. [ApexCharts](https://apexcharts.com/) for all the graphs and charts displayed
6. [Flaticon](https://flaticon.com/) for illustrated graphics
7. [Pexels](https://www.pexels.com) for photograph image on landing page
7. [GitHub](http://github.com) for the repository
8. [Visual Studio Code](https://code.visualstudio.com/) for editing code and visualising website on local server
9. [Netlify](https://www.netlify.com/) for deployment
   
### Data Sources

Data.gov.sg for data on judicial executions and drug abuser demographics.  
- https://data.gov.sg/dataset/judicial-executions
- https://data.gov.sg/dataset/demographic-profile-of-drug-abusers 
- https://data.gov.sg/dataset/population-of-inmates-in-drc
- https://data.gov.sg/dataset/inmates-released-from-drc 


### Other Attributions

1. [Coolors](https://coolors.co/462255-313b72-62a87c-7ee081-c3f3c0) for generating cohesive color schemes used in charts
2. [FontJoy](https://fontjoy.com) for generating complimentary font combinations used across the site
3. [Figma](https://www.figma.com) for planning website interface and skeleton creation

---

## Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/a4606763-89a7-4619-84aa-9e41d6d444e7/deploy-status)](https://app.netlify.com/sites/deathpenaltyproject/deploys)

The web app is hosted using [Netlify](https://www.netlify.com/).

Prerequisites:
- Edit code and push all commits to Github repository.
- Connect and authorise Netlify to Github.
- Select Github for continuous deployment.

Steps to publish:
1. In Netlify, select the desired repository to deploy. 
2. Select *'Deploy site'*.

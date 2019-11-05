<template>
<div class="container">
  <b-table ref="tblSlideDetails" striped hover dark small borderless :items="arTblItems" :fields="arTblFields"></b-table>
</div>  <!-- /container -->
</template>


<!--components/Slides.vue -->
<script>
import axios from 'axios'
import store from '../store.js'

export default {
  name: 'caseinquirydetails', // component name
    data() {
    return {
      arTblFields: ['SlideID', 'Stain', 'Status', 'Distribution_Location', 'Marked_For_Courier_Time', 'Microtomy_Station', 'Microtomy_Time', 'Stain_Order_Time', 'Slide_Tray'],
      arTblItems: null
    }
  },
  props: {
    strCaseNo: String
  },     
  created () {
          console.log('Start Load Case Inquiry Table')
          this.LoadTableData()
      },
  methods: {
      LoadTableData() {
          let strFullAPICall = store.state.apiURL + '/caseinquiry'
          console.log(strFullAPICall)
          this.arTblItems = []   

          axios.post(strFullAPICall, {
            ACCESSIONID: this.strCaseNo,
            apitoken: store.state.apitoken
            })
            .then(apidata => {

              if (apidata.errorcode) {
                console.log('error')
                return
              }

                          // Clear table data
            let temp = {}
            temp = apidata.data
            console.log(temp)

            for (var i = 1; i < apidata.data.length; i++) {
              let strSlideTray = ''
              let strSlideDistLoc = ''
              let dtRdyForCourier = ''
              let strFormattedDTReadyForCourier = ''
              let strFormattedDTSlidePrinted = ''
              let strFormattedDTStainOrdered = ''
              if(temp[i].SlideDistributionLocation) {
                strSlideDistLoc = temp[i].SlideDistributionLocation
              }

              let strSlideID = temp[i].SlideID

              if(temp[i].SlideTray) {
              strSlideTray = temp[i].SlideTray
              }


              // let strSlideTray = temp[i].SlideTray
              if(temp[i].DTReadyForCourier) {
                strFormattedDTReadyForCourier = this.FormatDateTime(new Date (temp[i].DTReadyForCourier))
              }

              if(temp[i].DTPrinted) {
                strFormattedDTSlidePrinted = this.FormatDateTime(new Date (temp[i].DTPrinted))
              }
              if(temp[i].StainOrderDate) {
                strFormattedDTStainOrdered = this.FormatDateTime(new Date (temp[i].StainOrderDate))
              }
              

              

              // console.log(strFormattedDate)
              // let strDTReadyForCourier = temp[i].DTReadyForCourier
              strSlideID = strSlideID.replace('HSLD', '')
              strSlideTray = strSlideTray.replace('SLTR', '')
              strSlideDistLoc = strSlideDistLoc.replace('LOCN', '')

              // Build Chart Data Array
              this.arTblItems.push({ isActive: false, SlideID: strSlideID, Stain: temp[i].StainLabel, Status: temp[i].Status, Distribution_Location: strSlideDistLoc, Marked_For_Courier_Time: strFormattedDTReadyForCourier, Microtomy_Station: temp[i].LocationPrinted, Microtomy_Time: strFormattedDTSlidePrinted, Stain_Order_Time: strFormattedDTStainOrdered, Slide_Tray: strSlideTray })

              } // end for

            //Refresh Table
            // console.log('Refresh Table')
            // this.$refs.tblSlideDetails.refresh()

            }).catch((e) => {
              console.log(e)
            })
            .catch(function (error) {
              console.log("error:")
              console.log(error)
            })
          /*
          axios.post(strFullAPICall, {
          ACCESSIONID: this.strCaseNo,
          apitoken: store.state.apitoken
        })
          .then(function (response) {
            // Clear table data
            let temp = {}
            temp = response.data
            console.log(temp)

            for (var i = 1; i < response.data.length; i++) {
              // Build Chart Data Array
              console.log(i)
              this.arTblItems.push({ isActive: false, SlideID: temp[i].SlideID, Stain: temp[i].StainLabel, Status: temp[i].status, Distribution_Location: temp[i].SlideDistributionLocation, Marked_For_Courier_Time: temp[i].DTReadyForCourier, Microtomy_Station: temp[i].LocationPrinted, Microtomy_Time: temp[i].DTPrinted, Stain_Order_Time: temp[i].StainOrderDate, Slide_Tray: temp[i].SlideTray })

              } // end for
          })
          .catch(function (error) {
            console.log(error)
            // reject(error)
          })
        console.log('promise done') */


      },
      FormatDateTime ( dtTemp ) {
        // dtTemp must be date
        let strFormattedDateTime = ''
        // let intMinutes = dtTemp.getMinutes()
        let intMinutes = dtTemp.getMinutes()
        // let intMinutes = Date.getMinutes()
        let strMinutes = ''
        if (intMinutes <= 9) {
          strMinutes = '0' + intMinutes
        } else {
          strMinutes = intMinutes
        }
        // let strFormattedDate = dtRdyForCourier.format('hh:mm mm/dd/yy')
        strFormattedDateTime = (dtTemp.getMonth() + 1) + '-' + dtTemp.getDate() + '-' + dtTemp.getFullYear() + ' ' + dtTemp.getHours() + ':' + strMinutes
        return strFormattedDateTime
      }
    

  },
}
</script>

<style scoped>
#slides {
  margin: 30px 0;
}

.loader {
  text-align: center;
}
</style>

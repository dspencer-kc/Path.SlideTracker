<template>
  <div>
    <div class="d-flex justify-content-center">      
        <div class="p-2 col-sm-3"><!--width is set by this div -->
          <div class="input-group">
              <b-input id="InputCaseNo" style="width: 150px;" v-model="strCaseNo" placeholder="Input Case No: ie D19-99999" />
              <b-button type="submit" variant="secondary sm" @click="LoadTableData()">OK</b-button>
        </div>
      </div>
    </div>
      <br>
      <div class="container">
        <b-table ref="tblSlideDetails" striped hover dark small borderless v-if='blShowTable' :items="arTblItems" :fields="arTblFields"></b-table>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store.js'

export default {
  name: 'CaseInquiryDetails',
  components: {
  },
  data() {
    return {
      strCaseNo: '',
      blShowTable: false,
      arTblFields: ['SlideID', 'Stain', 'Status', 'Distribution_Location', 'Marked_For_Courier_Time', 'Microtomy_Station', 'Microtomy_Time', 'Stain_Order_Time', 'Gross_Time', 'Slide_Tray'],
      arTblItems: null,
      strCaseNo: '',
      blLoading: false
    }
  },
  methods: {
    ShowTable()
    {
       this.blShowTable = true
    },
    LoadTableData() {
          
          this.blShowTable = false
          this.blLoading = true
          let strFullAPICall = store.state.apiURL + '/caseinquiry'
          // console.log(strFullAPICall)
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

            let temp = {}
            temp = apidata.data
            // console.log(temp)

            for (var i = 0; i < apidata.data.length; i++) {
              let strSlideTray = ''
              let strSlideDistLoc = ''
              let dtRdyForCourier = ''
              let strFormattedDTReadyForCourier = ''
              let strFormattedDTSlidePrinted = ''
              let strFormattedDTStainOrdered = ''
              let strFormattedDTGross= ''
              if(temp[i].SlideDistributionLocation) {
                strSlideDistLoc = temp[i].SlideDistributionLocation
              }
              let strSlideID = temp[i].SlideID

              if(temp[i].SlideTray) {
              strSlideTray = temp[i].SlideTray
              }
              if(temp[i].DTReadyForCourier) {
                strFormattedDTReadyForCourier = this.FormatDateTime(new Date (temp[i].DTReadyForCourier))
              }
              if(temp[i].DTPrinted) {
                strFormattedDTSlidePrinted = this.FormatDateTime(new Date (temp[i].DTPrinted))
              }
              if(temp[i].StainOrderDate) {
                strFormattedDTStainOrdered = this.FormatDateTime(new Date (temp[i].StainOrderDate))
              }
              if(temp[i].DateTimeEngraved) {
                strFormattedDTGross = this.FormatDateTime(new Date (temp[i].DateTimeEngraved))
              }               

              // console.log(strFormattedDate)
              strSlideID = strSlideID.replace('HSLD', '')
              strSlideTray = strSlideTray.replace('SLTR', '')
              strSlideDistLoc = strSlideDistLoc.replace('LOCN', '')

              // Build Chart Data Array
              this.arTblItems.push({ isActive: false, SlideID: strSlideID, Stain: temp[i].StainLabel, Status: temp[i].Status, Distribution_Location: strSlideDistLoc, Marked_For_Courier_Time: strFormattedDTReadyForCourier, Microtomy_Station: temp[i].LocationPrinted, Microtomy_Time: strFormattedDTSlidePrinted, Stain_Order_Time: strFormattedDTStainOrdered, Slide_Tray: strSlideTray, Gross_Time: strFormattedDTGross })
              
              } // end for
              this.blLoading = false
              this.blShowTable = true
            }).catch((e) => {
              console.log(e)
            })
            .catch(function (error) {
              console.log("error:")
              console.log(error)
            })
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
  }
}
</script>
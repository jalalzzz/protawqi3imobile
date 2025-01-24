class InvitationsModel {
  constructor(
    name,
    number,
    meetingDate,
    docSignStatusText,
    docSignStatusId,
    url,
    docSignGuid,
    downloadGuid,
    isUserConfirmed,
    lastViewedDate
  ) {
    this.name = name;
    this.number = number;
    this.meetingDate = meetingDate;
    this.docSignStatusText = docSignStatusText;
    this.docSignStatusId = docSignStatusId;
    this.url = url;
    this.docSignGuid = docSignGuid;
    this.downloadGuid = downloadGuid;
    this.isUserConfirmed = isUserConfirmed;
    this.lastViewedDate = lastViewedDate;
  }
}

export default InvitationsModel;

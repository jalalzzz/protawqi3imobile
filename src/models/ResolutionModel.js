class ResolutionModel {
  constructor(
    name,
    number,
    docSignStatusText,
    docSignStatusId,
    url,
    docSignGuid,
    downloadGuid,
    createdOnStr,
    lastViewedDate,
    invitees,
    resolutionType
  ) {
    this.name = name;
    this.number = number;
    this.docSignStatusText = docSignStatusText;
    this.docSignStatusId = docSignStatusId;
    this.url = url;
    this.docSignGuid = docSignGuid;
    this.downloadGuid = downloadGuid;
    this.createdOnStr = createdOnStr;
    this.lastViewedDate = lastViewedDate;
    this.invitees = invitees;
    this.resolutionType = resolutionType;
  }
}

export default ResolutionModel;

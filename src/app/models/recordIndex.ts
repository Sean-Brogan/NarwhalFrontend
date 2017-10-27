export class recordIndex {
    recordId: number;
    patientId: number;
    doctorId: number;
    recordTypeId: number;
    recordDate: number;
    patientName: string;
    doctorName: string;
    recordType: string;
    
    constructor() {
        this.patientName = "default";
        this.doctorName = "default";
        this.recordType = "default";
    }
}


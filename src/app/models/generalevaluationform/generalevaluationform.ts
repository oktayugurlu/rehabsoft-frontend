import {AppliedSurgery} from './appliedsurgery';
import {OrthesisInfo} from './orthesisinfo';
import {OtherOrthesisInfo} from './otherorthesisinfo';
import {UsedMedicine} from './usedmedicine';
import {CoexistingDiseases} from './CoexistingDisease';
import {ExpectationsAboutProgram} from './expectationsaboutprogram';

export class GeneralEvaluationForm {
  gender: string;
  birthDate: Date;
  ageAsMonth: number;
  numberOfSiblings: number;
  whichChild: number;
  heightCm: number;
  weightGr: number;
  headRoundCm: number;
  mothersGivenBirthAgeYear: number;
  mothersEducationLevel: string;
  typeOfPregnancy: string;
  fathersEducationLevel: string;
  multiplePregnancy: number;
  isRelativeMarriage: boolean;
  isBloodIncompatibility: boolean;
  birthWeek: number;
  birthType: string;
  apgarScore: number;
  isBirthAnoxia: boolean;
  isBirthEmpurpling: boolean;
  isHighBloodPressorPregnancy: boolean;
  pregnancyInfectionInfo: string;
  pregnancyMedicineUsageInfo: string;
  isPregnancyDrinking: boolean;
  isPregnanycSmoking: boolean;
  oxygenSupport: boolean;
  id: number;
  intensiveCare: boolean;

  //DiseaseOfMotherPregnancy
  diseaseName: string;

  //Hyperbilirubinemia
  isPhototeraphy: boolean;
  hospitalDayTime: number;

  //AfterBirthReasonCerebralPalsy
  occuringMonth: number;
  cause: string;
  causeInfo: string;

  //Botox_Treatment
  lastBotoxDate: Date;
  botoxRecordUrl: string;

  /*
    Many to Many ve.þ Many-To-Onelar buraya geecek
  */
  appliedSurgeryCollection: AppliedSurgery[];

  //One to many
  orthesisInfoCollection: OrthesisInfo[];
  otherOrthesisInfoCollection: OtherOrthesisInfo[];
  usedMedicineCollection: UsedMedicine[];

  //ManyToMany
  coexistingDiseasesCollection: CoexistingDiseases[];

  //VisualImpairement
  information: string;

  //OneTomany

  //HearingImpairment
  isUseHearingAid: string;

  //ExpectationsAboutProgram
  expectationsAboutProgramCollection: ExpectationsAboutProgram[];
}

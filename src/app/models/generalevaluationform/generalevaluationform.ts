import {AppliedSurgery} from './appliedsurgery';
import {OrthesisInfo} from './orthesisinfo';
import {OtherOrthesisInfo} from './otherorthesisinfo';
import {UsedMedicine} from './usedmedicine';
import {CoexistingDiseases} from './CoexistingDisease';
import {ExpectationsAboutProgram} from './expectationsaboutprogram';
import {DiseaseOfMotherPregnancy} from "./diseaseofmotherpregnancy";

export class GeneralEvaluationForm {

  // 1. Demografik Bilgiler
  gender: string;
  birthDate: Date;
  ageAsMonth: number;
  numberOfSiblings: number;
  whichChild: number;

  // 2. Fiziksel Özellikler
  heightCm: number;
  weightGr: number;
  headRoundCm: number;

  // 3. Dogum Oncesi Ozellikler
  mothersGivenBirthAgeYear: number;
  mothersEducationLevel: string;
  typeOfPregnancy: string;
  fathersEducationLevel: string;
  multiplePregnancy: number;
  isRelativeMarriage: boolean;
  isBloodIncompatibility: boolean;

  // 4. Dogum Ozellikler
  birthWeek: number;
  birthType: string;
  birthWeight: number;
  birthHeadAroundCm: number;
  apgarScore: number;
  isBirthAnoxia: boolean;
  isBirthEmpurpling: boolean;
  isBirthCrying: boolean;
  isHighBloodPressorPregnancy: boolean;
  pregnancyInfectionInfo: string;
  pregnancyMedicineUsageInfo: string;
  isPregnancyDrinking: boolean;
  isPregnanycSmoking: boolean;
  id: number;

  // 5.Doğum Sonrası Özellikler
  oxygenSupport: boolean;
  intensiveCare: number;
  isNewbornRetinopathy: boolean;
  isRespiratuvarDistressSyndrom: boolean
  isBronchopulmonaryDysplasia: boolean;
  isHypoglycaemia: boolean

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

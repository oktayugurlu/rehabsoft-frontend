import {AppliedSurgery} from './appliedsurgery';
import {OrthesisInfo} from './orthesisinfo';
import {OtherOrthesisInfo} from './otherorthesisinfo';
import {UsedMedicine} from './usedmedicine';
import {CoexistingDiseases} from './coexistingdisease';
import {ExpectationsAboutProgram} from './expectationsaboutprogram';
import {DiseaseOfMotherPregnancy} from "./diseaseofmotherpregnancy";
import {Hyperbilirubinemia} from "./hyperbilirubinemia";
import {AfterBirthReasonCerebralPalsy} from "./afterbirthreasoncerebralpalsy";
import {BotoxTreatment} from "./botoxtreatment";
import {VisualImpairment} from "./visualimpairment";
import {HearingImpairment} from "./hearingimpairment";
import {Epilepsy} from "./epilepsy";
import {PhysiotherapyPast} from "./physiotherapypast";

export class GeneralEvFormBoolean{
 //DiseaseOfMotherPregnancy
 isDiseaseOfMotherPregnancy:boolean;
 diseaseOfMotherPregnancy: DiseaseOfMotherPregnancy;

 //Hyperbilirubinemia
 isHyperbilirubinemiay:boolean;
 hyperbilirubinemia: Hyperbilirubinemia;

 isAfterBirthReasonCerebralPalsy:boolean;
 //AfterBirthReasonCerebralPalsy
 afterBirthReasonCerebralPalsy: AfterBirthReasonCerebralPalsy;

 //Botox_Treatment
 isBotoxTreatment:boolean;
 botoxTreatment: BotoxTreatment;

 /*
   Many to Many ve.þ Many-To-Onelar buraya geecek
 */
 isAppliedSurgeryCollection:boolean;
 appliedSurgeryCollection: AppliedSurgery[];


 //One to many
 isOrthesisInfoCollection:boolean;
 orthesisInfoCollection: OrthesisInfo[];

 isOtherOrthesisInfoCollection:boolean;
 otherOrthesisInfoCollection: OtherOrthesisInfo[];

 isUsedMedicineCollection:boolean;
 usedMedicineCollection: UsedMedicine[];

 //ManyToMany
 isCoexistingDiseasesCollection:boolean;
 coexistingDiseasesCollection: CoexistingDiseases[];

 //VisualImpairement
 isVisualimpairment:boolean;
 visualimpairment: VisualImpairment;

 //OneTomany

 //HearingImpairment
 isHearingImpairment:boolean;
 hearingImpairment: HearingImpairment;

 //ExpectationsAboutProgram
 isExpectationsAboutProgramCollection:boolean;
 expectationsAboutProgramCollection: ExpectationsAboutProgram[];

 //Epilepsy
 isEpilepsy:boolean;
 epilepsy: Epilepsy

 //Physioterapy Pas
 isPhysiotherapyPast:boolean;
 physiotherapyPast: PhysiotherapyPast


}
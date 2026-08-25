const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const adminEmail = 'admin@regisure.com';
  const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingUser) {
    const passwordHash = await bcrypt.hash('AdminSecret123!', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Super Administrator',
        passwordHash: passwordHash,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created: admin@regisure.com (Password: AdminSecret123!)');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  // 2. Seed Website Settings
  const defaultSettings = [
    { key: 'business_name', value: 'Regisure India Solutions', group: 'general' },
    { key: 'phone_number', value: '+91 98765 43210', group: 'general' },
    { key: 'email', value: 'contact@regisureindia.com', group: 'general' },
    { key: 'address', value: 'Plot 45, Cyber City, Tower B, Gurugram, Delhi NCR, India', group: 'general' },
    { key: 'working_hours', value: 'Monday - Saturday: 9:00 AM - 7:00 PM IST', group: 'general' },
    { key: 'hero_title', value: 'Professional Compliance & Business Registration Solutions Designed for Growth', group: 'general' },
    { key: 'hero_subtitle', value: 'From Private Limited Company, GST & NGO Registration to Trademarks & Tax Compliance, our certified experts handle everything while you focus on scaling.', group: 'general' },
    { key: 'facebook_url', value: 'https://facebook.com', group: 'social' },
    { key: 'twitter_url', value: 'https://twitter.com', group: 'social' },
    { key: 'linkedin_url', value: 'https://linkedin.com', group: 'social' },
    { key: 'instagram_url', value: 'https://instagram.com', group: 'social' },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Business settings configured');

  // 3. Seed Complete Service Catalog with Starting Prices in Rupees (₹)
  const services = [
    {
      name: 'NGO Registration',
      slug: 'ngo-registration',
      shortDescription: 'Register your NGO under Trust, Society, or Section 8 Company with legal drafting, 12A/80G tax exemptions, and NITI Aayog Darpan mapping.',
      description: `Establishing a Non-Governmental Organization (NGO) in India allows social entrepreneurs and non-profits to receive tax exemptions, government grants, and CSR contributions.\n\nRegisure India provides complete legal assistance for NGO Registration under Section 8 Company, Public Charitable Trust, or Society Registration. Our team of non-profit legal specialists prepares your MOA/AOA, Trust Deed, or Society Bye-laws, handles digital signature generation, files applications with the Registrar of Companies (ROC) or Sub-Registrar, and assists with 12A/80G tax exemption approvals.`,
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop',
      icon: 'Building2',
      benefits: JSON.stringify([
        'Eligible for 12A Income Tax Exemption & 80G Donor Deductions',
        'Eligible to Receive Foreign Contributions (FCRA Registration)',
        'Eligible for Corporate CSR Funding & Government Grants',
        'High Legal Standing & Corporate Credibility',
        'Limited Liability Protection for Section 8 Founders'
      ]),
      features: JSON.stringify([
        'Trust Deed / Society Bye-laws / Section 8 MOA Drafting',
        'DSC & DIN for Founding Trustees / Directors',
        'PAN, TAN & Bank Account Opening Documentation',
        'NITI Aayog Darpan Portal Profile Setup',
        '12A & 80G Preliminary Approval Assistance'
      ]),
      process: JSON.stringify([
        'Step 1: Consultation & Non-Profit Structure Selection (Trust/Society/Section 8)',
        'Step 2: Name Reservation & Legal Deed / MOA Drafting',
        'Step 3: Filing Application with MCA ROC / Sub-Registrar Office',
        'Step 4: Certificate of Registration Issued with PAN & TAN'
      ]),
      price: 'Starting at ₹8,999',
      seoTitle: 'NGO Registration Online India | Trust, Society & Section 8 | Regisure',
      seoDescription: 'Register your NGO under Trust, Society, or Section 8 Company. 100% online registration with 12A/80G assistance by Regisure India.',
      status: 'PUBLISHED',
      sortOrder: 1,
    },
    {
      name: 'Private Limited Company',
      slug: 'private-limited-company',
      shortDescription: 'Incorporate your Private Limited Company with DIN, DSC, Name Approval, PAN, TAN, and MOA/AOA filing in 7 days.',
      description: `A Private Limited Company (Pvt Ltd) is the premier business structure in India for startups and growing enterprises seeking venture capital funding and limited liability protection.\n\nRegisure India handles your end-to-end incorporation digitally. Our chartered accountant and legal team drafts customized MOA and AOA while ensuring 100% statutory compliance with the Ministry of Corporate Affairs (MCA).`,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      icon: 'Building2',
      benefits: JSON.stringify([
        '100% Digital & Paperless MCA Processing',
        'Includes Digital Signature Certificate (DSC) & DIN for Directors',
        'Includes PAN, TAN, and Zero Balance Corporate Bank Account Assistance',
        'Limited Liability Protection Safeguarding Personal Assets',
        'Preferred Structure for Investor Funding and VC Pitching'
      ]),
      features: JSON.stringify([
        'Name Availability Search & Reservation (RUN Service)',
        'Drafting of MOA & AOA by Senior Corporate Lawyers',
        'SPICe+ Part A & Part B MCA Portal Filing',
        'Certificate of Incorporation (COI) Issue Guarantee',
        'Complimentary 1-Year Compliance Roadmap Guidance'
      ]),
      process: JSON.stringify([
        'Step 1: Document Submission & Digital Signature Certificate (DSC) Generation',
        'Step 2: Company Name Reservation via MCA RUN Portal',
        'Step 3: MOA/AOA Drafting & SPICe+ Filing with Government Fees',
        'Step 4: Certificate of Incorporation (COI) Issued with PAN & TAN'
      ]),
      price: 'Starting at ₹7,999',
      seoTitle: 'Pvt Ltd Company Registration India | Regisure India',
      seoDescription: 'Incorporate your Private Limited Company in 7 working days. Free DIN, DSC, PAN, TAN & Bank Account opening with Regisure India.',
      status: 'PUBLISHED',
      sortOrder: 2,
    },
    {
      name: 'LLP Registration',
      slug: 'llp-registration',
      shortDescription: 'Register your Limited Liability Partnership with corporate credibility, limited partner liability, and low annual compliance costs.',
      description: `Limited Liability Partnership (LLP) combines the advantages of a partnership firm with limited liability protection of a private limited company. It is ideal for professional service providers, consultants, and family enterprises.\n\nRegisure India manages name reservation (RUN-LLP), partner DIN/DSC generation, LLP Agreement drafting, and Form 2 & Form 3 portal filings.`,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
      icon: 'Building2',
      benefits: JSON.stringify([
        'No Minimum Capital Requirement',
        'Limited Partner Liability Protection',
        'Lower Audit & Statutory Compliance Costs compared to Pvt Ltd',
        'No Dividend Distribution Tax (DDT)',
        'Ideal for Professional Services & Consultancies'
      ]),
      features: JSON.stringify([
        'RUN-LLP Name Reservation Filing',
        'DSC & DPIN Allocation for Designated Partners',
        'Customized LLP Agreement Drafting',
        'Form 2 & Form 3 MCA Incorporation Filing',
        'PAN, TAN & Corporate Bank Account setup'
      ]),
      process: JSON.stringify([
        'Step 1: Partner Document Verification & DSC Application',
        'Step 2: LLP Name Reservation on MCA Portal',
        'Step 3: FiLLiP Form Filing for Incorporation',
        'Step 4: Drafting & Form 3 Filing of LLP Agreement'
      ]),
      price: 'Starting at ₹7,999',
      seoTitle: 'LLP Registration Online India | Regisure India',
      seoDescription: 'Register Limited Liability Partnership (LLP) online with custom LLP agreement drafting and MCA filing.',
      status: 'PUBLISHED',
      sortOrder: 3,
    },
    {
      name: 'OPC Registration',
      slug: 'opc-registration',
      shortDescription: 'One Person Company registration for single founders wanting full corporate status with limited liability protection.',
      description: `One Person Company (OPC) is a revolutionary structure allowing a single entrepreneur to operate an incorporated corporate entity while retaining 100% ownership control and enjoying limited liability protection.\n\nWe assist single founders with nominee consent filing (Form INC-3), DSC creation, MOA/AOA drafting, and MCA Incorporation certificate delivery.`,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      icon: 'Building2',
      benefits: JSON.stringify([
        '100% Single Owner Control with Corporate Structure',
        'Limited Personal Asset Liability Risk',
        'Separate Legal Entity Status distinct from Sole Proprietorship',
        'Easier Access to Bank Loans & Credit Lines',
        'Can Convert to Private Limited Company easily later'
      ]),
      features: JSON.stringify([
        'Nominee Consent Form INC-3 Preparation',
        'Director DSC & DIN Allocation',
        'SPICe+ OPC Incorporation Filing',
        'PAN, TAN & EPF/ESIC Registration',
        'MOA & AOA Special OPC Clause Drafting'
      ]),
      process: JSON.stringify([
        'Step 1: Founder & Nominee Identity Document Verification',
        'Step 2: DSC Application & Name Availability Check',
        'Step 3: SPICe+ MCA Portal Submission with INC-3 Nominee Form',
        'Step 4: COI Certificate Issued with PAN & TAN'
      ]),
      price: 'Starting at ₹7,999',
      seoTitle: 'One Person Company OPC Registration India | Regisure',
      seoDescription: 'Incorporate One Person Company (OPC) online. Complete single founder registration with limited liability protection.',
      status: 'PUBLISHED',
      sortOrder: 4,
    },
    {
      name: 'Annual Compliances',
      slug: 'annual-compliances',
      shortDescription: 'End-to-end secretarial and annual ROC return filings (AOC-4, MGT-7, DIR-3 KYC) for Pvt Ltd & LLP companies.',
      description: `Every incorporated company in India must complete annual statutory return filings with the Registrar of Companies (ROC) regardless of turnover to avoid heavy daily late fees of ₹100/day.\n\nOur virtual CS & CA compliance department prepares annual financial statements, board meeting minutes, DIR-3 KYC filings, AOC-4, and MGT-7/7A returns seamlessly.`,
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
      icon: 'CheckCircle2',
      benefits: JSON.stringify([
        'Avoid Heavy Daily Late Fees of ₹100/Day per Form',
        'Protect Directors from DIN Deactivation & Disqualification',
        'Maintain Active & Clean Status on Ministry of Corporate Affairs',
        'Dedicated Chartered Accountant & Company Secretary Assigned',
        'Includes Statutory Financial Statement Preparation'
      ]),
      features: JSON.stringify([
        'Form AOC-4 Financial Statement ROC Filing',
        'Form MGT-7 / MGT-7A Annual Return Filing',
        'DIR-3 KYC Filing for All Directors',
        'ADT-1 Auditor Appointment Resolution',
        'Preparation of Director Board Report & AGM Minutes'
      ]),
      process: JSON.stringify([
        'Step 1: Financial Books Reconciliation & Statutory Audit Preparation',
        'Step 2: Board Meeting Resolution & AGM Minutes Drafting',
        'Step 3: AOC-4 and MGT-7 Form Preparation with Digital Signatures',
        'Step 4: MCA Portal Filing & SRN Receipt Generation'
      ]),
      price: 'Starting at ₹14,999',
      seoTitle: 'Annual Corporate ROC & Secretarial Compliance | Regisure',
      seoDescription: 'Complete annual AOC-4, MGT-7, and DIR-3 KYC ROC filing for companies by certified Chartered Accountants.',
      status: 'PUBLISHED',
      sortOrder: 5,
    },
    {
      name: 'GST Registration & Filing',
      slug: 'gst-registration-filing',
      shortDescription: 'Obtain your 15-digit GSTIN in 3 days and automate monthly GSTR-1 & GSTR-3B filings with zero penalties.',
      description: `Goods and Services Tax (GST) registration is mandatory for businesses exceeding turnover limits or engaging in inter-state e-commerce sales.\n\nRegisure India provides fast 3-day GSTIN allocation, document verification, HSN code mapping, and monthly/quarterly GSTR return preparation by experienced GST accountants.`,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
      icon: 'FileText',
      benefits: JSON.stringify([
        'Fast 3-Day GSTIN Allocation Guarantee',
        'Claim Input Tax Credit (ITC) on Business Purchases',
        'Sell Products Nationally across E-Commerce Platforms (Amazon, Flipkart)',
        'Prevent Heavy Late Penalties with Automated Monthly Filing Alerts',
        'Dedicated CA Support for GST Audit & Notice Resolution'
      ]),
      features: JSON.stringify([
        'HSN / SAC Code Mapping & Tax Rate Optimization',
        'Principal Place of Business Verification Support',
        'GSTR-1 Sales Invoicing & Return Preparation',
        'GSTR-3B Tax Reconciliation & Electronic Credit Ledger Matching',
        'Annual GSTR-9 Audit Preparation'
      ]),
      process: JSON.stringify([
        'Step 1: Upload Electricity Bill, Rental Agreement & ID Proofs',
        'Step 2: Application Submission on Govt GST Portal (GST REG-01)',
        'Step 3: Verification & Application Reference Number (ARN) Generation',
        'Step 4: GSTIN Certificate Issued & Portal Credentials Delivered'
      ]),
      price: 'Starting at ₹999',
      seoTitle: 'Online GST Registration & Return Filing | Regisure India',
      seoDescription: 'Obtain 15-digit GSTIN in 3 days. Complete document verification & automated monthly GSTR return filing by expert CAs.',
      status: 'PUBLISHED',
      sortOrder: 6,
    },
    {
      name: 'ITR Filing',
      slug: 'itr-filing',
      shortDescription: 'File your Income Tax Return (ITR-1 to ITR-7) accurately with maximum tax refund calculation and CA verification.',
      description: `Accurate Income Tax Return (ITR) filing is essential for individuals, freelancers, business owners, and corporate entities to maintain tax compliance and claim valid refunds.\n\nOur CA tax experts analyze your Form 26AS, AIS/TIS data, capital gains, and business deductions to file ITR returns with zero audit risks.`,
      image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200&auto=format&fit=crop',
      icon: 'FileText',
      benefits: JSON.stringify([
        'Maximize Tax Refunds with Full Deduction Claiming (80C, 80D, 80GG)',
        'Mandatory Document for Visa Applications & Home/Car Loan Approvals',
        'Carry Forward Capital & Business Losses for Future Tax Savings',
        '100% CA Verified Calculation preventing Tax Notice Risk',
        'Fast Filing Acknowledgement (ITR-V) Receipt'
      ]),
      features: JSON.stringify([
        'Form 26AS & AIS / TIS Data Reconciliation',
        'Capital Gain Calculation for Stocks, Crypto & Real Estate',
        'Business Expense Deductions & Presumptive Taxation (44AD/44ADA)',
        'Filing of ITR-1, ITR-2, ITR-3, ITR-4, ITR-5, or ITR-6',
        'E-Verification Assistance'
      ]),
      process: JSON.stringify([
        'Step 1: Share Form 16, Bank Statements & Investment Receipts',
        'Step 2: CA Calculation & Tax Deduction Optimization',
        'Step 3: Client Draft Approval & Income Tax Portal Filing',
        'Step 4: Download Official ITR Acknowledgement Receipt'
      ]),
      price: 'Starting at ₹999',
      seoTitle: 'Income Tax Return ITR Filing Online | Regisure India',
      seoDescription: 'File your ITR online with expert Chartered Accountants. Maximize tax refunds and ensure 100% compliance.',
      status: 'PUBLISHED',
      sortOrder: 7,
    },
    {
      name: '12A & 80G Registration',
      slug: '12a-80g-registration',
      shortDescription: 'Obtain 12A tax exemption certificate & 80G 50% tax deduction eligibility for donors to your NGO.',
      description: `Getting 12A and 80G registration from the Income Tax Department is vital for any NGO, Trust, or Society. 12A exempts your NGO's income from income tax, while 80G allows your donors to claim 50% tax deduction on their contributions.\n\nRegisure India prepares Form 10A / Form 10AB documentation, financial projections, activity reports, and coordinates with Income Tax Commissioners for fast approvals.`,
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=1200&auto=format&fit=crop',
      icon: 'Award',
      benefits: JSON.stringify([
        '100% Exemption from Income Tax on Charitable Income (12A)',
        '50% Tax Deduction Benefit for Donors (80G)',
        'Attract CSR Capital & Institutional Corporate Donors',
        'Lifetime Validity with Periodic Form 10AB Renewal',
        'Enhance Institutional Trust & Philanthropic Credibility'
      ]),
      features: JSON.stringify([
        'Form 10A / 10AB Income Tax Portal Filing',
        'Activity Report & 3-Year Financial Statement Preparation',
        'Trust Deed / MOA Clause Legal Verification',
        'Handling Queries & Hearing Representation with IT Officers',
        'Provisional & Permanent Registration Certificate Delivery'
      ]),
      process: JSON.stringify([
        'Step 1: Verification of NGO Registration Certificate & Accounts',
        'Step 2: Preparation of Activity Report & Form 10A Documentation',
        'Step 3: Portal Submission to Income Tax Commissionerate',
        'Step 4: Grant of 12A & 80G Exemption Orders'
      ]),
      price: 'Starting at ₹4,999',
      seoTitle: '12A and 80G NGO Registration Online | Regisure India',
      seoDescription: 'Obtain 12A & 80G tax exemption certificates for your NGO/Trust. Fast filing & expert CA representation.',
      status: 'PUBLISHED',
      sortOrder: 8,
    },
    {
      name: 'NITI Aayog Darpan Registration',
      slug: 'niti-aayog-registration',
      shortDescription: 'Get your NGO Darpan Unique ID to become eligible for central & state government grants & welfare funding.',
      description: `NGO Darpan portal registration managed by NITI Aayog is mandatory for any NGO, Trust, or Society seeking government funding, grants, and ministry schemes in India.\n\nWe complete your portal profile registration, document submission, executive member mapping, and deliver your official Unique Darpan ID.`,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
      icon: 'ShieldCheck',
      benefits: JSON.stringify([
        'Mandatory Prerequisite for Government Grants & Ministry Schemes',
        'Issuance of Official Unique NGO Darpan Identification Number',
        'Direct Access to Central Government Social Welfare Grants',
        'Listed on Official Government Non-Profit Directory',
        'Improves Trust for International Philanthropic Funding'
      ]),
      features: JSON.stringify([
        'NITI Aayog Portal Registration & Profile Creation',
        'Governing Body Member Mapping & Aadhaar/PAN Linking',
        'Sectoral Specialization & Work History Verification',
        'Uploading Audit Reports & Trust Deeds',
        'Official Unique ID Certificate Generation'
      ]),
      process: JSON.stringify([
        'Step 1: Collect Trust/Society Registration Cert & Member Details',
        'Step 2: Online Profile Setup on NITI Aayog Darpan Portal',
        'Step 3: Verification of Executive Board Identification Data',
        'Step 4: Issuance of Unique NGO Darpan ID'
      ]),
      price: 'Starting at ₹999',
      seoTitle: 'NITI Aayog NGO Darpan Registration | Regisure India',
      seoDescription: 'Register your NGO on NITI Aayog Darpan portal. Get Unique ID for government grants & schemes.',
      status: 'PUBLISHED',
      sortOrder: 9,
    },
    {
      name: 'CSR Registration (Form CSR-1)',
      slug: 'csr-registration',
      shortDescription: 'File Form CSR-1 on MCA portal to receive Corporate Social Responsibility (CSR) funds from corporate companies.',
      description: `Under Section 135 of the Companies Act 2013, corporate entities can only disburse Corporate Social Responsibility (CSR) grants to NGOs registered with the Ministry of Corporate Affairs via Form CSR-1.\n\nWe handle Form CSR-1 drafting, professional CA certification, digital signature signing, and system generation of your CSR Registration Number.`,
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop',
      icon: 'Award',
      benefits: JSON.stringify([
        'Mandatory Legal Prerequisite to Receive Corporate CSR Funds',
        'Official Registration with Ministry of Corporate Affairs (MCA)',
        'System Generation of Unique CSR Registration Number',
        'Boosts Corporate Partnership Opportunities with MNCs',
        'Valid for Section 8 Companies, Trusts & Registered Societies'
      ]),
      features: JSON.stringify([
        'Form CSR-1 Preparation & Data Validation',
        'Attestation & Certification by Practicing CA/CS',
        'DSC Attachment & MCA Portal Submission',
        'Instant Approval SRN Receipt Generation',
        'System Generated CSR Registration Certificate'
      ]),
      process: JSON.stringify([
        'Step 1: Upload NGO Registration Cert, 12A/80G Orders & Member PANs',
        'Step 2: Form CSR-1 Drafting & CA Professional Verification',
        'Step 3: Digital Signature Signing & MCA Portal Submission',
        'Step 4: Approval Receipt & CSR Registration Number Issued'
      ]),
      price: 'Starting at ₹2,999',
      seoTitle: 'Form CSR-1 Registration Online for NGOs | Regisure India',
      seoDescription: 'File Form CSR-1 on MCA portal with CA certification to become eligible for Corporate CSR Funding.',
      status: 'PUBLISHED',
      sortOrder: 10,
    },
    {
      name: 'E-Anudaan Registration',
      slug: 'e-anudaan-registration',
      shortDescription: 'Register your non-profit on the Ministry of Social Justice & Empowerment e-Anudaan portal for government grants.',
      description: `e-Anudaan is the official portal for voluntary organizations applying for financial assistance under schemes of the Ministry of Social Justice and Empowerment.\n\nOur team completes organization registration, scheme mapping, and verification submission on the official portal.`,
      image: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop',
      icon: 'ShieldCheck',
      benefits: JSON.stringify([
        'Eligible for Ministry of Social Justice Financial Assistance',
        'Direct Online Grant Application Submission',
        'Transparent Processing of Welfare Project Proposals',
        'Official Ministry Voluntary Organization Verification',
        'Empowers Welfare Programs for Senior Citizens & Differently Abled'
      ]),
      features: JSON.stringify([
        'e-Anudaan Portal Profile Setup & Account Creation',
        'Organization Registration & Unique ID Mapping',
        'Uploading Financial Audit Reports & Annual Reports',
        'Scheme Application & Project Document Attachment',
        'Verification Tracking & Acknowledgement'
      ]),
      process: JSON.stringify([
        'Step 1: Document Gathering (Registration Cert, NITI Darpan ID, Audits)',
        'Step 2: e-Anudaan Portal Account Setup',
        'Step 3: Submission of Voluntary Organization Data',
        'Step 4: Download Portal Registration Confirmation'
      ]),
      price: 'Starting at ₹999',
      seoTitle: 'e-Anudaan Portal Registration for NGOs | Regisure India',
      seoDescription: 'Register your NGO on e-Anudaan portal for Social Justice Ministry grants and schemes.',
      status: 'PUBLISHED',
      sortOrder: 11,
    },
    {
      name: 'FSSAI Food License',
      slug: 'fssai-food-license',
      shortDescription: 'Mandatory Food Safety Registration (Basic, State, or Central) for restaurants, cloud kitchens, and food businesses.',
      description: `Every Food Business Operator (FBO) in India — from food manufacturers and restaurants to Swiggy/Zomato cloud kitchens — requires a valid FSSAI 14-digit license.\n\nRegisure India files Form A/B on the FoSCoS portal, handles inspector query resolution, and delivers your official certificate.`,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      icon: 'Utensils',
      benefits: JSON.stringify([
        '14-Digit FSSAI Registration Number to Print on Food Packaging',
        'Essential for Partnering with Swiggy, Zomato & E-Commerce Delivery Apps',
        'Instills Consumer Confidence in Food Safety & Cleanliness',
        'Avoid Penalties up to ₹5 Lakhs for Unlicensed Operations',
        '1 to 5 Year Validity Options Available'
      ]),
      features: JSON.stringify([
        'FoSCoS Portal Registration & Form A/B Filing',
        'Food Category & Capacity Allocation Assistance',
        'Water Analysis Report & Layout Blueprint Support',
        'Hygiene Checklist & Nomination Form Preparation',
        'License Renewal & Modification Services'
      ]),
      process: JSON.stringify([
        'Step 1: Document Gathering (Photo, ID, Premises Proof)',
        'Step 2: Application Draft & FoSCoS Government Filing',
        'Step 3: Query Clarification with Food Safety Inspector',
        'Step 4: Download Official FSSAI License Certificate'
      ]),
      price: 'Starting at ₹1,499',
      seoTitle: 'FSSAI Food License Online Application | Regisure India',
      seoDescription: 'Apply for Basic, State, or Central FSSAI Food License online. Essential for restaurants, cloud kitchens, and Swiggy/Zomato listings.',
      status: 'PUBLISHED',
      sortOrder: 12,
    },
    {
      name: 'Trademark Registration',
      slug: 'trademark-registration',
      shortDescription: 'Protect your brand name, logo, and slogan with official TM filing under 45 NICE classes within 24 hours.',
      description: `Protect your brand identity from competitors. Registering a trademark gives you exclusive legal rights to use your brand name and logo across India.\n\nWe conduct clearance searches, file Form TM-A with IP India, provide ™ usage rights within 24 hours, and handle opposition hearings.`,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
      icon: 'ShieldCheck',
      benefits: JSON.stringify([
        'Start Using ™ Symbol within 24 Hours of Application',
        '10-Year Exclusive Legal Protection for Brand & Logo',
        'Nationwide Intellectual Property Ownership Rights',
        'Asset Creation Increase Company Valuation for Investors',
        'Prevent Copycats & Infringers from Hijacking Your Brand'
      ]),
      features: JSON.stringify([
        'Comprehensive Pre-Filing Trademark Clearance Search',
        'NICE Classification Mapping (Class 1 to 45)',
        'Application Filing under Form TM-A',
        'Objection Handling & Legal Counter-Statement Drafting',
        'Trademark Renewal & Royalty Agreement Support'
      ]),
      process: JSON.stringify([
        'Step 1: Brand Name & Logo Conflict Availability Search',
        'Step 2: User Affidavit & Authorization Drafting',
        'Step 3: Filing TM-A Application with IP India Registry',
        'Step 4: Receive ™ Application Number & Tracking Credentials'
      ]),
      price: 'Starting at ₹6,999',
      seoTitle: 'Trademark Brand Registration Online | Regisure India',
      seoDescription: 'Secure your brand name and logo with official Trademark filing. Get ™ symbol in 24 hours with Regisure India IP experts.',
      status: 'PUBLISHED',
      sortOrder: 13,
    },
    {
      name: 'ISO Certification',
      slug: 'iso-certification',
      shortDescription: 'ISO 9001:2015 Quality Management certification to boost client trust & win corporate tenders.',
      description: `ISO 9001 certification demonstrates your company's commitment to high quality standards, consistent service delivery, and operational excellence.\n\nWe assist with quality manual SOP drafting, internal audit checks, lead auditor assessment, and official certificate issuance.`,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
      icon: 'Award',
      benefits: JSON.stringify([
        'Global Recognition & Enhanced Market Credibility',
        'Mandatory Prerequisite for Government Tenders & RFPs',
        'Streamlined Internal Operations & Reduced Waste',
        'Higher Customer Satisfaction & Brand Loyalty',
        'Valid for 3 Years with Annual Surveillance Support'
      ]),
      features: JSON.stringify([
        'Gap Analysis & Process Workflow Assessment',
        'Standard Operating Procedure (SOP) & QMS Manual Drafting',
        'Staff Training on ISO Quality Compliance',
        'Internal Audit Execution & Non-Conformity Rectification',
        'Final Accreditation Audit Coordination'
      ]),
      process: JSON.stringify([
        'Step 1: Business Audit & Requirement Mapping',
        'Step 2: QMS Manual & Documentation Preparation',
        'Step 3: System Implementation & Employee Orientation',
        'Step 4: Accreditation Body Assessment & Certificate Dispatch'
      ]),
      price: 'Starting at ₹2,999',
      seoTitle: 'ISO 9001:2015 Quality Certification | Regisure India',
      seoDescription: 'Get ISO 9001 Quality Management Certification for your business. Fast-track process for corporate contracts & government tenders.',
      status: 'PUBLISHED',
      sortOrder: 14,
    },
    {
      name: 'Import Export Code (IEC)',
      slug: 'import-export-code',
      shortDescription: 'Obtain 10-digit Importer Exporter Code (IEC) from DGFT for cross-border international trade & customs.',
      description: `Importer Exporter Code (IEC) issued by the Directorate General of Foreign Trade (DGFT) is mandatory for any business importing or exporting goods and service payments in and out of India.\n\nRegisure India completes DGFT portal registration, bank account linkage, and issues your permanent 10-digit IEC certificate.`,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
      icon: 'FileText',
      benefits: JSON.stringify([
        'Mandatory 10-Digit Code for International Customs & Shipments',
        'Lifetime Validity with Zero Annual Renewal Filing',
        'Required to Receive Foreign Inward Remittances in Bank',
        'Eligible for DGFT Export Promotion & Rebate Schemes',
        'Quick 24-Hour Digital Allocation'
      ]),
      features: JSON.stringify([
        'DGFT Portal Registration & Application Preparation',
        'Bank Certificate (ANF-2A) & Cancelled Cheque Validation',
        'Digital Signature / Aadhaar OTP Verification',
        'Issue of Permanent 10-Digit IEC E-Certificate',
        'IEC Annual Update Assistance'
      ]),
      process: JSON.stringify([
        'Step 1: Upload PAN, Aadhaar, Bank Details & Premises Proof',
        'Step 2: DGFT Application Filing with Government Fee',
        'Step 3: Digital Verification & Customs System Sync',
        'Step 4: Download Official IEC Registration Certificate'
      ]),
      price: 'Starting at ₹2,999',
      seoTitle: 'Import Export Code IEC Registration DGFT | Regisure',
      seoDescription: 'Apply for DGFT Import Export Code (IEC) online. Get 10-digit lifetime IEC in 24 hours.',
      status: 'PUBLISHED',
      sortOrder: 15,
    },
    {
      name: 'Audit Report',
      slug: 'audit-report',
      shortDescription: 'Comprehensive Statutory, Internal, Tax Audit & Financial Statement preparation by certified Chartered Accountants.',
      description: `Statutory Tax Audits under Section 44AB of the Income Tax Act and Company Statutory Audits are essential for business compliance, bank loans, and investor due diligence.\n\nOur senior Chartered Accountants perform detailed ledger auditing, balance sheet verification, cash flow statements, and formal Audit Report issuance.`,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
      icon: 'CheckCircle2',
      benefits: JSON.stringify([
        'Statutory Compliance under Income Tax Act Sec 44AB',
        'Essential for Bank Credit Lines & Corporate Loan Approvals',
        'Uncover Financial Inefficiencies & Accounting Discrepancies',
        'Certified CA Audit Sign-off & Audit Report Issuance',
        'Prevents Income Tax Penalties up to ₹1.5 Lakhs'
      ]),
      features: JSON.stringify([
        'Form 3CA/3CB and Form 3CD Tax Audit Filing',
        'Balance Sheet & Profit & Loss Statement Auditing',
        'GST & Tax Ledger Reconciliation',
        'Internal Controls & Inventory Verification',
        'CA Certified Audit Report Delivery'
      ]),
      process: JSON.stringify([
        'Step 1: Tally/Zoho/QuickBooks Financial Data Review',
        'Step 2: Ledger Verification & Voucher Sampling Audit',
        'Step 3: Preparation of Form 3CD Tax Audit Report',
        'Step 4: CA Digital Signature Signing & Income Tax Portal Upload'
      ]),
      price: 'Starting at ₹9,999',
      seoTitle: 'Statutory Tax Audit & Audit Report Filing | Regisure',
      seoDescription: 'Get your Form 3CA/3CB and 3CD Tax Audit Report filed by certified Chartered Accountants.',
      status: 'PUBLISHED',
      sortOrder: 16,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log('✅ 16 Core services updated in database with starting prices in Rupees (₹)!');

  // 4. Seed Dynamic Pages (About Us, Privacy Policy, Terms & Conditions)
  const defaultPages = [
    {
      slug: 'about',
      title: 'Empowering Indian Enterprises to Scale Seamlessly',
      subtitle: 'Pioneering Corporate Excellence',
      content: 'Regisure India was founded with a singular vision: to liberate entrepreneurs from tedious government bureaucracy and statutory legal friction through technology, transparency, and top-tier chartered accountancy.',
      sections: JSON.stringify({
        mission: {
          title: 'Our Mission',
          desc: 'To deliver 100% digital, fast, and bulletproof legal incorporation, GST, trademark, and tax secretarial compliance to every growing business in India with total cost transparency.'
        },
        vision: {
          title: 'Our Vision',
          desc: 'To become the single most trusted statutory partner and compliance operating system for over 100,000 corporate enterprises across India by 2030.'
        },
        values: [
          { title: 'Absolute Integrity', desc: 'No hidden government fees or surprise upsells. Complete upfront pricing transparency.' },
          { title: 'Statutory Rigor', desc: 'Every application is thoroughly audited by certified CAs and advocates before submission.' },
          { title: 'Speed & Execution', desc: 'Rapid SLA turnarounds with automated MCA, GST, and IP portal tracking updates.' },
          { title: 'Client Confidentiality', desc: 'Bank-grade encryption protecting your personal financial identity documents.' },
          { title: 'Proactive Advisory', desc: 'We notify you well before compliance due dates so you never incur ROC penalties.' },
          { title: 'Lifelong Partnership', desc: 'From day 1 incorporation to series funding statutory audits, we stand by your company.' }
        ]
      }),
      seoTitle: 'About Us | Regisure India Solutions',
      seoDescription: 'Learn more about Regisure India, our mission, vision, core legal values, and certified chartered accountant leadership.',
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      subtitle: 'Last Updated: January 2026',
      content: 'At Regisure India, we take your data privacy seriously. When you use our consultation forms, contact forms, or legal services, we collect personal details necessary for MCA, GST, and statutory filings.',
      sections: JSON.stringify([
        {
          heading: '1. Information We Collect',
          text: 'At Regisure India, we take your data privacy seriously. When you use our consultation forms, contact forms, or legal services, we collect personal details including your full name, phone number, email address, corporate identity documents, and business details necessary for MCA, GST, and statutory filings.'
        },
        {
          heading: '2. How We Use Your Information',
          text: 'Your information is exclusively used to provide corporate incorporation, tax registration, intellectual property filing, and annual secretarial compliance services. We do not sell or trade your data to third-party advertisers under any circumstances.'
        },
        {
          heading: '3. Data Security & Storage',
          text: 'We implement industry-standard AES-256 SSL encryption and secure server access protocols. Access to identity documents (PAN, Aadhaar, Passport) is strictly restricted to certified CAs and legal associates managing your statutory filings.'
        },
        {
          heading: '4. Contacting Us',
          text: 'If you have any questions regarding this Privacy Policy, you may contact our Compliance Officer at contact@regisureindia.com or call us at +91 98765 43210.'
        }
      ]),
      seoTitle: 'Privacy Policy | Regisure India Solutions',
      seoDescription: 'Privacy Policy and data protection commitments of Regisure India Solutions.',
    },
    {
      slug: 'terms-and-conditions',
      title: 'Terms & Conditions',
      subtitle: 'Last Updated: January 2026',
      content: 'By accessing our website or retaining Regisure India Solutions for incorporation, GST, trademark, or secretarial services, you agree to comply with and be bound by these terms and conditions.',
      sections: JSON.stringify([
        {
          heading: '1. Acceptance of Terms',
          text: 'By accessing our website or retaining Regisure India Solutions for incorporation, GST, trademark, or secretarial services, you agree to comply with and be bound by these terms and conditions.'
        },
        {
          heading: '2. Professional Consultancy Services',
          text: 'Regisure India Solutions acts as a professional legal and corporate advisory facilitator. Statutory approval timelines (MCA COI, GSTIN, FSSAI) are subject to government portal processing schedules and government officer verification.'
        },
        {
          heading: '3. Client Responsibilities',
          text: 'Clients are responsible for providing authentic, accurate, and un-tampered identity, address proof, and corporate documents. Regisure India Solutions is not liable for statutory rejections resulting from fraudulent or incorrect client submissions.'
        },
        {
          heading: '4. Governing Law',
          text: 'These terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of these services shall be subject to the exclusive jurisdiction of the courts in Delhi NCR, India.'
        }
      ]),
      seoTitle: 'Terms & Conditions | Regisure India Solutions',
      seoDescription: 'Terms and conditions governing the corporate consultancy services provided by Regisure India Solutions.',
    }
  ];

  for (const page of defaultPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }
  console.log('✅ Dynamic Pages (About Us, Privacy Policy, Terms & Conditions) configured in database!');

  console.log('🚀 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

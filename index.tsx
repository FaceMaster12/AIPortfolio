
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Added Variants to the import to explicitly type the variants object.
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';

// --- UTILITIES ---
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Declare emailjs for TypeScript
declare const emailjs: any;

// --- DATA ---
const personalInfo = {
  name: 'Babyface Mokoena',
  title: 'AI/ML Engineer & Developer',
  brandingStatement: 'Passionate about leveraging artificial intelligence and machine learning to build innovative solutions that solve real-world problems. Skilled in developing, training, and deploying complex models.',
  bio: 'As a recent graduate from Tshwane University of Technology with a National Diploma in Software Development, I am a passionate and dedicated engineer at the intersection of software development and artificial intelligence. I thrive in collaborative environments and am eager to join a dynamic, forward-thinking team where I can apply my skills to solve complex problems. My objective is to contribute to cutting-edge AI projects, continuously expand my expertise, and utilize my abilities to the fullest to create impactful and innovative solutions.',
  resumeUrl: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EX_mmch8jelHlVusg1oUtrgBQsqjSwrLvULMETtmULuk0w?e=URMiy5',
  linkedinUrl: 'https://www.linkedin.com/in/babyface-mokoena-62a796208',
  githubUrl: 'https://github.com/FaceMaster12',
  email: 'mokoenababyface105@gmail.com',
  profileImageUrl: './profile.jpeg' ,
};

// --- SVG ICONS ---
const EmailIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>);
const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>);
const ResumeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM13 9V3.5L18.5 9H13z"></path></svg>);
const DemoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" /><path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.25 7.75v2.5a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.5L7.247 11.694a.75.75 0 00-.053 1.06z" clipRule="evenodd" /></svg>;
const CertificateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.483 2.112a.75.75 0 01.766.034l5.25 3.5a.75.75 0 010 1.258l-5.25 3.5a.75.75 0 01-.766.034V2.112zM3.483 2.112a.75.75 0 00-.766.034l-2.25 1.5a.75.75 0 000 1.258l2.25 1.5a.75.75 0 00.766.034V2.112z" clipRule="evenodd" /><path d="M10 5.253l5.25 3.5-5.25 3.5-5.25-3.5L10 5.253z" /><path fillRule="evenodd" d="M12.25 12.189a.75.75 0 01.53 1.28l-2.25 2.25a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 111.06-1.06L9.5 13.56l.19-.19a.75.75 0 011.06 0l.19.19 1.22-1.22a.75.75 0 011.09.25z" clipRule="evenodd" /></svg>;
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.57.055 1.14.122 1.71.2V3.75a4.25 4.25 0 00-4.25-4.25h-2.5A4.25 4.25 0 004.25 3.75v.643c.57-.078 1.14-.145 1.71-.2V3.75zM4.25 7.5A2.25 2.25 0 002 9.75v5.5A2.25 2.25 0 004.25 17.5h11.5A2.25 2.25 0 0018 15.25v-5.5A2.25 2.25 0 0015.75 7.5h-3.5v.328c.133.043.265.09.395.142l.002.001.002.001a2.873 2.873 0 011.83 2.61c.03.221.047.445.047.668v.321a.75.75 0 01-1.5 0v-.321a1.373 1.373 0 00-.047-.668 1.373 1.373 0 00-1.83-1.11v-.142H4.25zm8.5 0h-3.5v.47a.75.75 0 01-1.5 0V7.5H4.25v2.25h11.5V7.5z" clipRule="evenodd" /></svg>);

// --- SKILL ICONS ---
const PythonIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.964 1.332C7.532 1.332 4 4.86 4 9.293c0 2.204 2.132 3.932 2.132 3.932v4.843c0 2.532 2.053 4.587 4.587 4.587h.001c.112 0 .224-.004.335-.013a.925.925 0 0 0 .15-.025c.102-.023.203-.053.3-.085a.913.913 0 0 0 .138-.086c.08-.05.156-.108.228-.172a.885.885 0 0 0 .121-.143c.063-.08.118-.168.167-.26a.81.81 0 0 0 .09-.23c.026-.08.046-.164.06-.252a.669.669 0 0 0 .022-.164c.005-.05.008-.1.01-.15v-4.63h3.21c2.454 0 4.436-1.981 4.436-4.435S18.378 4.86 15.924 4.86h-3.96zM7.042 9.293a2.91 2.91 0 0 1 2.91-2.909h3.96c.884 0 1.603.719 1.603 1.603s-.719 1.603-1.603 1.603h-3.96a2.91 2.91 0 0 1-2.91-2.909v.003zm-.006 4.63c-.02 0-.039-.001-.058-.003v-.005zm12.928 6.745c-2.454 0-4.436-1.982-4.436-4.436s1.982-4.436 4.436-4.436h3.96c2.433 0 4.436 1.982 4.436 4.436 0 2.204-2.132 3.932-2.132 3.932v.005c.02.012.039.022.058.033v4.843c0 2.532-2.053 4.587-4.587 4.587h-.001c-.112 0-.224-.004-.335-.013a.925.925 0 0 1-.15-.025c-.102-.023-.203-.053-.3-.085a.913.913 0 0 1-.138-.086c-.08-.05-.156-.108-.228-.172a.885.885 0 0 1-.121-.143c-.063-.08-.118-.168-.167-.26a.81.81 0 0 1-.09-.23c-.026-.08-.046-.164-.06-.252a.669.669 0 0 1-.022-.164c-.005-.05-.008-.1-.01-.15v-1.125zm4.054-3.31a2.91 2.91 0 0 1-2.91 2.909h-3.96c-.884 0-1.603-.719-1.603-1.603s.719-1.603 1.603-1.603h3.96a2.91 2.91 0 0 1 2.91 2.909v-.003z"/></svg>;
const JavaScriptIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0zm22.034 18.262c.42.63.148 1.403-.593 1.632-.563.182-1.156-.13-1.42-1.031l-1.9-6.332h-2.13V22h-3.322V6.155h5.45c2.45 0 4.2.82 4.2 2.87 0 1.74-.98 2.62-2.52 2.8v.06c1.82.12 3.01 1.23 3.01 3.03 0 1.44-.7 2.6-1.875 3.342zm-8.683.05c.42.63.148 1.403-.593 1.632-.563.182-1.156-.13-1.42-1.031L9.432 12.5h-2.13V22H3.98V6.155h5.45c2.45 0 4.2.82 4.2 2.87 0 1.74-.98 2.62-2.52 2.8v.06c1.82.12 3.01 1.23 3.01 3.03 0 1.44-.7 2.6-1.875 3.342zM16.403 12.5c0-.9-.42-1.52-1.33-1.52h-1.9V15.2h1.9c.91 0 1.33-.62 1.33-1.52v-1.18zm.622-4.13c0-.9-.49-1.52-1.4-1.52h-2.13v3.2h2.13c.91 0 1.4-.62 1.4-1.52v-.16z"/></svg>;
const TypeScriptIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0 h21 v21 h-21z M3 1.5 v18 h18 v-18z M12.33 13.887L11.19 15 l-1.14-1.113 V 15 H8.55 V 9.11 h1.5 v4.83 L11.19 15 l1.14-1.113 V 9.11 h1.5 V 15 h-1.5z M19.45 10.36 h-3.9v1.22h1.635v5.37h1.5v-5.37h1.635v-1.22h-1.635z"/></svg>;
const CSharpIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.23 11.231H23.5V13h-8.526L13.23 11.231zm-1.89-6.326L0 12l11.34 7.095 4.524-2.828-8.9-5.625 8.9-5.625-4.524-2.828zM16.5 16.25h2v2h-2v-2zm3.5 0h2v2h-2v-2zm-3.5 3.5h2v2h-2v-2zm3.5 0h2v2h-2v-2z"/></svg>;
const CPlusPlusIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.06,10.29h-1.9V8.41h1.9Zm5.3,0h-1.9V8.41h1.9ZM13.06,15.6h-1.9v-1.9h1.9Zm5.3,0h-1.9v-1.9h1.9ZM13.28,3.28a10,10,0,1,0,0,17.44h.16V3.12h-.16ZM7.14,15.75c-1.32-1-2-2.58-2-4.14s.72-3.13,2.05-4.14a4.42,4.42,0,0,1,3-1.2h.1V18.15h-.1A4.42,4.42,0,0,1,7.14,15.75Z"/></svg>;
const DjangoIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.378 0v16.974l-8.62-6.52L0 12.63l10.952 9.096h.852l2.316-2.02v-3.41L24 19.32V6.632l-3.326-2.56-6.564 5.346V0Z"/></svg>;
const AngularIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l10.439 3.09-1.789 15.17L12 24l-8.65-5.74L1.561 3.09Z M12 4.41l6.101 1.706-1.042 9.12-5.06 3.32-5.059-3.32-1.042-9.12Z M12 5.5l-3.36 8.32h2.09l.66-1.75h4.24l.66 1.75h2.09L12 5.5zm-.93 5.42l.93-2.43.93 2.43h-1.86Z"/></svg>;
const SpringIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.81 10.34c-1.5-3.3-4.57-5.5-8.2-5.74.34-.6.54-1.28.54-2a2.6 2.6 0 00-2.6-2.6c-1.44 0-2.6 1.16-2.6 2.6a2.6 2.6 0 00.55 1.57C5.45 4.54 2.2 7.21.9 11.45c-.24.78-.32 1.6-.26 2.41a3 3 0 002.08 2.5c.3.1.61.13.91.13.56 0 1.1-.2 1.56-.56 1.48-1.16 2.3-2.85 2.22-4.63-.07-1.32.5-2.6 1.56-3.44a3.17 3.17 0 013.43-.1c1.24.8 1.94 2.2 1.8 3.65-.13 2.13.9 4.14 2.72 5.28a2.53 2.53 0 003.3-.87c1.1-1.4 1.4-3.23.9-4.82zM12 24a12 12 0 01-8.5-20.5A12 12 0 0120.5 3.5 12 12 0 0112 24z"/></svg>;
const PandasIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.25 12.01c0-2.18-.5-3.8-1.58-4.9-1.07-1.08-2.6-1.62-4.6-1.62h-3.3v13h3.3c2 0 3.53-.54 4.6-1.62 1.08-1.1 1.58-2.7 1.58-4.86zm-5.18 3.52c-.6.6-1.46.9-2.5.9h-1.05v-8.8h1.05c1.04 0 1.88.3 2.5.9.6.6.9 1.5.9 2.7 0 1.2-.3 2.1-.9 2.7zM1.75 5.5v13h3.3v-5.2h1.1c1.6 0 2.8-.4 3.6-1.2.8-.8 1.2-2 1.2-3.4s-.4-2.6-1.2-3.4c-.8-.8-2-1.2-3.6-1.2H1.75zm3.3 5.3v-3.7h1.05c.84 0 1.5.2 1.8.6.3.4.5 1 .5 1.8 0 .8-.2 1.4-.5 1.8-.3.4-1 .6-1.8.6H5.05z"/></svg>;
const NumpyIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l-9.8 6.4v11.2l9.8 6.4 9.8-6.4V6.4L12 0zm-8 7.3l8-5.2 8 5.2v3.7l-4.2-2.8v-1l-3.8 2.5-3.8-2.5v1l-4.2 2.8V7.3zm16 8.3l-8 5.2-8-5.2v-3.7l4.2 2.8v1l3.8-2.5 3.8 2.5v-1l4.2-2.8v3.7z"/></svg>;
const ReactIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-8c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5zm6.5 0c0-1.654-1.346-3-3-3s-3 1.346-3 3 1.346 3 3 3 3-1.346 3-3zm-1.5 0c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-4.5 0c.01-.004 0 0 0 0zM12 4.169c-2.35 0-4.545 1.15-5.908 3.03l1.168.85C8.38 6.64 10.08 5.669 12 5.669s3.62 1.029 4.74 2.38l1.168-.85C16.545 5.319 14.35 4.169 12 4.169zm0 15.662c2.35 0 4.545-1.15 5.908-3.03l-1.168-.85c-1.12 1.35-2.82 2.321-4.74 2.321s-3.62-1.029-4.74-2.38l-1.168.85c1.363 1.88 3.558 3.03 5.908 3.03z"/></svg>;
const NodejsIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L2.16 6v12L12 24l9.84-6V6L12 0zm7.15 16.9L12 19.65l-7.15-2.75v-5.5L12 14.15l7.15-2.75v5.5zm0-6.6L12 13.05l-7.15-2.75L12 7.55l7.15 2.75z"/></svg>;
const SqlIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 19.5V4.5H2.25v15H12v-2.25H4.5zm7.5-15v15H21V4.5h-9zm2.25 10.5h4.5v2.25h-4.5v-2.25zm0-3h4.5v2.25h-4.5V12zm0-3h4.5v2.25h-4.5V9z"/></svg>;
const MysqlIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zM8.5 7h7v2.5h-7V7zm3.5 12.5c-2 0-3.81-.7-4.95-2.05l1.41-1.41C9.21 17.3 10.5 18 12 18s2.79-.7 3.54-1.95l1.41 1.41C15.81 18.8 14 19.5 12 19.5zm-3.5-7.5v-2h2v2h-2zm2.75 3h-1.5v-2h1.5v2zm2.25 0h-1.5v-2h1.5v2zm2.25 0h-1.5v-2h1.5v2z"/></svg>;
const PostgresqlIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-2h3v-2H8V8h3V6H6v12h5v-2zm7 0h-3v-2h3v-2h-3V8h3V6h-5v12h5v-2z"/></svg>;
const MongodbIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c.95 0 1.85.17 2.68.48-1.12.75-1.9 2.05-1.9 3.52a4 4 0 004 4c1.47 0 2.77-.78 3.52-1.9.31.83.48 1.73.48 2.68 0 4.41-3.59 8-8 8z"/></svg>;
const VscodeIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.15 2.587L18.43 0l-5.012 5.012L8.406 0 3.687 2.587l5.012 5.012L3.687 12.61l4.719 2.588L13.42 10.186l5.012 5.012 4.719-2.588-5.012-5.012zM0 12l5.438 9.413L10.156 12 5.438 2.587z"/></svg>;
const GcpIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-2h3v-2H8V8h3V6H6v12h5v-2zm7 0h-3v-2h3v-2h-3V8h3V6h-5v12h5v-2z"/></svg>;
const AwsIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-2h3v-2H8V8h3V6H6v12h5v-2zm7 0h-3v-2h3v-2h-3V8h3V6h-5v12h5v-2z"/></svg>;
const GitIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.37 13.37L12 12l-3.37 3.37-1.41-1.41L10.59 12 7.22 8.63l1.41-1.41L12 10.59l3.37-3.37 1.41 1.41L13.41 12l3.37 3.37-1.41 1.41z"/></svg>;
const JupyterIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c0-.83.67-1.5 1.5-1.5h7c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-7c-.83 0-1.5-.67-1.5-1.5z"/></svg>;

const skills = [
  { 
    category: 'Languages', 
    items: [
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'JavaScript', icon: <JavaScriptIcon /> },
      { name: 'TypeScript', icon: <TypeScriptIcon /> },
      { name: 'C#', icon: <CSharpIcon /> },
      { name: 'C++', icon: <CPlusPlusIcon /> },
    ] 
  },
  { 
    category: 'Frameworks & Libraries', 
    items: [
      { name: 'Django', icon: <DjangoIcon /> },
      { name: 'Angular', icon: <AngularIcon /> },
      { name: 'Spring', icon: <SpringIcon /> },
      { name: 'Pandas', icon: <PandasIcon /> },
      { name: 'NumPy', icon: <NumpyIcon /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'Node.js', icon: <NodejsIcon /> }
    ] 
  },
  { 
    category: 'Backend & Databases', 
    items: [
      { name: 'SQL', icon: <SqlIcon /> },
      { name: 'MySQL', icon: <MysqlIcon /> },
      { name: 'PostgreSQL', icon: <PostgresqlIcon /> },
      { name: 'MongoDB', icon: <MongodbIcon /> }
    ] 
  },
  { 
    category: 'Tools & Platforms', 
    items: [
      { name: 'VS Code', icon: <VscodeIcon /> },
      { name: 'GCP', icon: <GcpIcon /> },
      { name: 'AWS', icon: <AwsIcon /> },
      { name: 'Git', icon: <GitIcon /> },
      { name: 'GitHub', icon: <GithubIcon /> },
      { name: 'Jupyter', icon: <JupyterIcon /> }
    ] 
  },
];

const experienceData = [
  {
    role: 'IT Support Technician',
    company: 'Letaba TVET College',
    period: 'Feb 2025 - Jun 2025',
    description: [
      'Provided comprehensive help desk support for both staff and students.',
      'Managed hardware lifecycle, including installation, maintenance, repair, and user support.',
    ]
  },
  {
    role: 'Robotic Facilitator',
    company: 'Leolo Technical School',
    period: 'Aug 2024 - Jan 2025',
    description: [
      'Facilitated training in digital skills, including 3D printing, programming, and FTC Robotics coaching.',
    ]
  }
];

const projects = [
  { 
    title: 'Sentiment Analysis Dashboard', 
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', 
    description: 'A web app to analyze text sentiment from various sources (.txt, .docx, .pdf, raw text). It provides detailed analysis like classification, scores, and keyword highlights using the Gemini API, streamlining insights for customer feedback and market research.', 
    tags: ['AI', 'NLP', 'Sentiment Analysis', 'React', 'Gemini API'], 
    demoUrl: 'https://sentiment-analysis-two-puce.vercel.app/', 
    repoUrl: 'https://github.com/RockyPacks/Sentiment-Analysis.git' 
  },
  { title: 'AI Study Buddy', imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', description: 'The vision is to evolve AI Study Buddy from a personal learning assistant into a collaborative, personalized, and indispensable educational platform. The strategy prioritizes features that enhance the core user experience, expand learning capabilities, and introduce collaboration and personalization over time.', tags: ['AI', 'EdTech', 'Collaborative'], demoUrl: 'https://ai-study-buddy-bmwm.vercel.app/', repoUrl: 'https://github.com/MediLex-Tech-group/AIStudyBuddy' },
  { title: 'MediLex AI Chatbot', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', description: 'A high-fidelity prototype designed in Figma for an AI-powered assistant aimed at healthcare professionals. It demonstrates a system that captures symptoms, analyzes prescriptions using NLP and OCR, and provides diagnostic suggestions to reduce administrative burden.', tags: ['AI', 'Healthcare', 'NLP', 'OCR', 'Figma'], demoUrl: 'https://www.figma.com/design/uN3PIcZDJX9r7LcIQ7LSKq/Untitled?node-id=0-1&p=f&t=QfHkl1tgyrrkrABs-0', repoUrl: '#' },
];

const certificates = [
  { name: 'AI Essentials', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EV7fJ52CWWlNkwEXz5zu0B4BdEG55-uVEIxIutjNO2SHnQ?e=RnQTmm' },
  { name: 'Artificial Intelligence on Microsoft Azure', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EckYiYV9mf1LpwfnJFPChzUBmYZumZKMtR-viRDI6kVkOQ?e=P7aC86' },
  { name: 'Building AI Powered Chatbots Without Programming', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EdDh1CjSYuZMpECoZSwXF6cBEsAl1l5b45i1OJ__FTgvZw?e=Aeltn6' },
  { name: 'Introduction to Artificial Intelligence', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EaxaFKUX_cdPmdKmKdv1ezMBKDEYPTyNFjtxtdyjfRP95Q?e=3LzYam' },
  { name: 'Python Development & AI Foundations', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EQqrJYpe9oVOoS0dverDMjUBT1pMaaHfCH9sD1jVJHLH7A?e=7vYSXX' },
  { name: 'Python for Data Science, AI & Development', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EXW99z2_boNIvDy_kMXy6A0B9bw2GCV4O_mfDfk1qeBJCg?e=9gyAMQ' },
  { name: 'Data Fundamentals', link: 'https://capeitinitiative-my.sharepoint.com/:b:/g/personal/babyface_mokoena_capaciti_org_za/EX2OSL1pAL9Ju551kwM9dBUBAxJrQHBUgQQTNiQxQ4JYVQ?e=njAxrA' }
];

// --- UI COMPONENTS ---

const AnimatedCursor = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }
      if (trailerRef.current) {
        trailerRef.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`,
        }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll(
      'a, button, input, [role="button"], .project-card, .certificate-card'
    );
    const handleMouseEnter = () => wrapperRef.current?.classList.add('grow');
    const handleMouseLeave = () => wrapperRef.current?.classList.remove('grow');

    interactiveElements.forEach(el => el.addEventListener('mouseenter', handleMouseEnter));
    interactiveElements.forEach(el => el.addEventListener('mouseleave', handleMouseLeave));

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={wrapperRef} className="cursor-wrapper">
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={trailerRef} className="cursor-trailer"></div>
    </div>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.894 17.894a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.061zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM6.106 17.894a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 6.106a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.06L6.106 7.167a.75.75 0 010-1.06z" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" /></svg>
      )}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 80;
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const sections = ['home', 'about', 'experience', 'skills', 'certifications', 'projects', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navLinks = ['home', 'about', 'experience', 'skills', 'certifications', 'projects', 'contact'];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`nav-logo ${activeSection === 'home' ? 'active' : ''}`}>BM</a>
      <div className="nav-menu">
        <ul className="nav-links">
          {navLinks.map(id => (
            <li key={id}>
                <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)} className={activeSection === id ? 'active' : ''}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
};

const Header = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  // FIX: Explicitly typed variants with Variants to fix type inference issue with the 'ease' property.
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <header id="home" className="header">
      <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{}}>
        <motion.h1 custom={0} variants={variants} className="gradient-text">{personalInfo.name}</motion.h1>
        <motion.p custom={1} variants={variants} className="subtitle">{personalInfo.title}</motion.p>
        <motion.p custom={2} variants={variants}>{personalInfo.brandingStatement}</motion.p>
      </motion.div>
    </header>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  return (
    <section id="skills" className="container">
      <h2>My Skillset</h2>
      <motion.div ref={ref} className="skills-grid" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{}}>
        {skills.map((category, index) => (
          <motion.div key={category.category} className="skill-category" custom={index} variants={variants}>
            <h3>{category.category}</h3>
            <div className="skill-items-grid">
              {category.items.map(item => (
                <div key={item.name} className="skill-item" title={item.name}>
                  <div className="skill-icon-container">{item.icon}</div>
                  <span className="skill-name">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="experience" className="container">
      <h2>My Experience</h2>
      <motion.div ref={ref} className="timeline" initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        {experienceData.map((item, index) => (
          <motion.div key={index} className="timeline-item" custom={index} variants={itemVariants}>
            <div className="timeline-icon"><BriefcaseIcon /></div>
            <div className="timeline-content">
              <h3>{item.role}</h3>
              <p className="company-period">
                <span className="company">{item.company}</span>
                <span className="period">{item.period}</span>
              </p>
              <ul>
                {item.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  // FIX: Explicitly typed cardVariants with Variants to resolve the type error on the 'ease' property.
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section id="certifications" className="container">
      <h2>Certifications & Achievements</h2>
      <motion.div
        ref={ref}
        className="certifications-grid"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{}}
      >
        {certificates.map((cert, index) => (
          <motion.div key={cert.name} className="certificate-card" custom={index} variants={cardVariants}>
             <div className="certificate-icon"><CertificateIcon/></div>
            <h3>{cert.name}</h3>
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="certificate-link">
              View Certificate
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ProjectCardSkeleton = () => (
    <div className="project-card-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-tags">
                <div className="skeleton-tag"></div>
                <div className="skeleton-tag"></div>
                <div className="skeleton-tag"></div>
            </div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
        </div>
    </div>
);

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const hasDemo = project.demoUrl && project.demoUrl !== '#';
  const hasRepo = project.repoUrl && project.repoUrl !== '#';

  return (
    <div className="project-card">
      <div className="project-card-image">
        {project.imageUrl && <img src={project.imageUrl} alt={project.title} loading="lazy" />}
        {hasDemo && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-demo-btn">
            View Demo
          </a>
        )}
      </div>
      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="project-links">
          {hasRepo 
            ? <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"><GithubIcon /> Code</a>
            : <a className="disabled-link" aria-disabled="true"><GithubIcon /> Code</a>
          }
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [loading, setLoading] = useState(true);

    const allTags = useMemo(() => ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))], []);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const results = projects.filter(p => {
            const matchesSearch =
                p.title.toLowerCase().includes(lowercasedTerm) ||
                p.description.toLowerCase().includes(lowercasedTerm) ||
                p.tags.some(t => t.toLowerCase().includes(lowercasedTerm));
            
            const matchesTag = activeTag === 'All' || p.tags.includes(activeTag);

            return matchesSearch && matchesTag;
        });
        setFilteredProjects(results);
    }, [searchTerm, activeTag]);

    const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, 300);

    return (
        <section id="projects" className="container">
            <h2>Projects Showcase</h2>
             <div className="project-filters">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="project-search">
                <input type="search" placeholder="Search projects by title, description or tag..." onChange={handleSearch} aria-label="Search projects" />
            </div>
            <AnimatePresence>
                <motion.div className="projects-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
                    ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project, i) => (
                             <motion.div key={project.title} initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                                <ProjectCard project={project} />
                             </motion.div>
                        ))
                    ) : (
                        <div className="no-projects-found"><p>No projects found for "{searchTerm}".</p></div>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section id="about" className="container">
      <h2>About Me</h2>
      <motion.div ref={ref} className="about-content" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <div className="about-image">
          <img src={personalInfo.profileImageUrl} alt={personalInfo.name} />
        </div>
        <div className="about-bio"><p>{personalInfo.bio}</p></div>
      </motion.div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.subject) tempErrors.subject = "Subject is required.";
    if (!formData.message) tempErrors.message = "Message is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus('sending');
      const templateParams = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
      };
      emailjs.send("service_2pnmxxg", "template_5haqxeq", templateParams)
        .then(() => {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
        })
        .catch((error: any) => {
          console.error("Error sending email:", error);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === 'success') {
    return <p className="success-message">Thank you for your message! I'll get back to you soon.</p>;
  }

  if (status === 'error') {
    return <p className="error-message form-status">Failed to send email. Please try again or contact me directly.</p>;
  }


  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="name" className="sr-only">Name</label>
        <input type="text" id="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={errors.name ? 'invalid' : ''} aria-invalid={!!errors.name} />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="sr-only">Email</label>
        <input type="email" id="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={errors.email ? 'invalid' : ''} aria-invalid={!!errors.email} />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="sr-only">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className={errors.subject ? 'invalid' : ''} aria-invalid={!!errors.subject} />
        {errors.subject && <p className="error-message">{errors.subject}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea id="message" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} className={errors.message ? 'invalid' : ''} aria-invalid={!!errors.message}></textarea>
        {errors.message && <p className="error-message">{errors.message}</p>}
      </div>
      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="container">
      <h2>Get In Touch</h2>
      <p className="contact-intro">I'm currently open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out!</p>
      <div className="career-links">
        {personalInfo.resumeUrl && (
           <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn">
            <ResumeIcon />
            View Resume
          </a>
        )}
        <a href={`mailto:${personalInfo.email}`} className="btn">
          <EmailIcon />
          Email Me
        </a>
        <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn">
          <LinkedinIcon />
          LinkedIn
        </a>
        <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
          <GithubIcon />
          GitHub
        </a>
      </div>
      <ContactForm />
    </section>
  );
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
                <div className="social-links">
                    <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
                    <a href={`mailto:${personalInfo.email}`} aria-label="Email"><EmailIcon /></a>
                </div>
            </div>
        </footer>
    );
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: { x: number, y: number, radius: number, vx: number, vy: number }[] = [];
        let animationFrameId: number;

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = Array.from({ length: 100 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            }));
        };

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(51, 51, 51, 0.7)';
            
            stars.forEach(s => {
                s.x += s.vx;
                s.y += s.vy;
                if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
                if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(tick);
        };
        
        setup();
        tick();

        const handleResize = debounce(setup, 200);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="starry-background"></canvas>;
};

const App = () => {
  return (
    <>
      <AnimatedBackground />
      <AnimatedCursor />
      <Navbar />
      <main>
        <Header />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

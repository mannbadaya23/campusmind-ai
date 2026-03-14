// src/hooks/useFirestore.js
// Central hook for all Firestore operations - used across entire app

import { useState, useEffect } from "react";
import {
  doc, collection, setDoc, getDoc, getDocs,
  addDoc, updateDoc, deleteDoc, onSnapshot,
  query, orderBy, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export const useFirestore = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  // ─── TASKS ───────────────────────────────────────────
  const saveTasks = async (tasks) => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "data", "tasks");
    await setDoc(ref, { tasks, updatedAt: serverTimestamp() });
  };

  const loadTasks = async () => {
    if (!uid) return [];
    const ref = doc(db, "users", uid, "data", "tasks");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().tasks || [] : [];
  };

  // ─── EXAMS ───────────────────────────────────────────
  const saveExams = async (exams) => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "data", "exams");
    await setDoc(ref, { exams, updatedAt: serverTimestamp() });
  };

  const loadExams = async () => {
    if (!uid) return [];
    const ref = doc(db, "users", uid, "data", "exams");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().exams || [] : [];
  };

  // ─── STRESS LOGS ─────────────────────────────────────
  const saveStressLog = async (stressLevel, mood, notes) => {
    if (!uid) return;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "stressLogs", today);
    await setDoc(ref, {
      stressLevel,
      mood,
      notes,
      date: today,
      createdAt: serverTimestamp()
    });
  };

  const loadStressLogs = async () => {
    if (!uid) return [];
    const ref = collection(db, "users", uid, "stressLogs");
    const q = query(ref, orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
  };

  // ─── MOOD TRACKER ─────────────────────────────────────
  const saveMood = async (moodValue, note) => {
    if (!uid) return;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "moodLogs", today);
    await setDoc(ref, {
      moodValue,
      note,
      date: today,
      createdAt: serverTimestamp()
    });
  };

  const loadMoodHistory = async () => {
    if (!uid) return [];
    const ref = collection(db, "users", uid, "moodLogs");
    const q = query(ref, orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
  };

  // ─── HABIT TRACKER ───────────────────────────────────
  const saveHabits = async (habits) => {
    if (!uid) return;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "habitLogs", today);
    await setDoc(ref, { habits, date: today, updatedAt: serverTimestamp() });
  };

  const loadTodayHabits = async () => {
    if (!uid) return null;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "habitLogs", today);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().habits : null;
  };

  // ─── AI REPORTS ──────────────────────────────────────
  const saveAIReport = async (report) => {
    if (!uid) return;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "aiReports", today);
    await setDoc(ref, { report, date: today, createdAt: serverTimestamp() });
  };

  const loadLatestAIReport = async () => {
    if (!uid) return null;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "aiReports", today);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().report : null;
  };

  // ─── STUDY STATS ─────────────────────────────────────
  const saveStudyStats = async (stats) => {
    if (!uid) return;
    const today = new Date().toISOString().split("T")[0];
    const ref = doc(db, "users", uid, "studyStats", today);
    await setDoc(ref, { ...stats, date: today, updatedAt: serverTimestamp() });
  };

  const loadWeeklyStats = async () => {
    if (!uid) return [];
    const ref = collection(db, "users", uid, "studyStats");
    const q = query(ref, orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data()).slice(0, 7);
  };

  return {
    saveTasks, loadTasks,
    saveExams, loadExams,
    saveStressLog, loadStressLogs,
    saveMood, loadMoodHistory,
    saveHabits, loadTodayHabits,
    saveAIReport, loadLatestAIReport,
    saveStudyStats, loadWeeklyStats,
  };
};

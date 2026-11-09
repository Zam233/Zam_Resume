"""Pydantic models for the resume payload.

Everything the page renders comes from ``data/resume.json``; the models exist so
the API contract is explicit and validated at boot rather than at request time.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class Meta(BaseModel):
    model_config = ConfigDict(extra="ignore")

    source: str
    updated: str
    note: str


class Profile(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str
    latin: str
    age: int
    status: str
    address: str
    fields: list[str] = Field(default_factory=list)
    summary: str = ""
    portrait: str = ""


class Skill(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str
    group: str = ""


class Account(BaseModel):
    model_config = ConfigDict(extra="ignore")

    platform: str
    handle: str
    followers: str
    note: str = ""
    url: str | None = None


class EducationItem(BaseModel):
    model_config = ConfigDict(extra="ignore")

    kind: Literal["note", "thesis", "award", "role"] = "note"
    text: str


class Education(BaseModel):
    model_config = ConfigDict(extra="ignore")

    school: str
    degree: str
    major: str = ""
    gpa: str = ""
    period: str
    current: bool = False
    items: list[EducationItem] = Field(default_factory=list)


class Experience(BaseModel):
    model_config = ConfigDict(extra="ignore")

    company: str
    role: str
    period: str
    bullets: list[str] = Field(default_factory=list)


class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")

    title: str
    subtitle: str = ""
    summary: str = ""
    link: str | None = None
    linkLabel: str | None = None
    pipeline: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)


class OtherProject(BaseModel):
    model_config = ConfigDict(extra="ignore")

    time: str
    text: str


class Resume(BaseModel):
    model_config = ConfigDict(extra="ignore")

    meta: Meta
    profile: Profile
    skills: list[Skill] = Field(default_factory=list)
    certificates: list[str] = Field(default_factory=list)
    aiAgents: list[str] = Field(default_factory=list)
    accounts: list[Account] = Field(default_factory=list)
    education: list[Education] = Field(default_factory=list)
    experience: list[Experience] = Field(default_factory=list)
    projects: list[Project] = Field(default_factory=list)
    otherProjects: list[OtherProject] = Field(default_factory=list)


class Stats(BaseModel):
    """Derived counters — only counting facts that exist in the source file."""

    degrees: int
    roles: int
    projects: int
    skills: int
    certificates: int
    accounts: int
